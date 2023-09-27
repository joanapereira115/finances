var express = require("express");
const path = require("path");

const { readFile, writeToFile } = require("../logic/files.js");
const { updateAccount } = require("../logic/finances.js");

var router = express.Router();

const homeDirectory = process.env.HOME || process.env.USERPROFILE;
const targetDirectory = path.join(homeDirectory, "finances");
const expensesDataFile = path.join(targetDirectory, "expensesData.json");
const accountsDataFile = path.join(targetDirectory, "accountsData.json");

/* retrieve the list of expenses of a determined year */
router.post("/getByYear", async (req, res) => {
  const { pin, year } = req.body;
  let expensesData = await readFile(expensesDataFile, pin);
  const expenses = expensesData.filter((expense) => expense.year === year);
  res.json(expenses);
});

/* create new expense */
router.post("/new", async (req, res) => {
  const { pin, expense } = req.body;

  try {
    const jsonData = await readFile(expensesDataFile, pin);

    if (jsonData.length > 0) {
      jsonData.push(expense);
      let result = await writeToFile(expensesDataFile, jsonData, pin);
      if (!result.error) {
        result = await updateAccount(
          accountsDataFile,
          pin,
          expense.account,
          expense.value * -1
        );
        if (result.error) {
          await writeToFile(
            expensesDataFile,
            jsonData.map((exp) => exp.id != expense.id),
            pin
          );
        }
      }
      res.json(result);
    } else {
      let result = await writeToFile(expensesDataFile, [expense], pin);
      res.json(result);
    }
  } catch (error) {
    console.error("Error adding expense data:", error);
    res.json({ error: true });
  }
});

/* delete existing expense */
router.post("/delete", async (req, res) => {
  const { pin, id } = req.body;

  try {
    const jsonData = await readFile(expensesDataFile, pin);
    const prev = jsonData.find((obj) => obj.id === id);
    const newData = jsonData.filter((expense) => expense.id !== id);
    let result = await writeToFile(expensesDataFile, newData, pin);
    if (!result.error) {
      result = await updateAccount(
        accountsDataFile,
        pin,
        prev.account,
        prev.value
      );
      if (result.error) {
        await writeToFile(expensesDataFile, jsonData, pin);
      }
    }
    res.json(result);
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.json({ error: true });
  }
});

/* edit existing expense */
router.post("/edit", async (req, res) => {
  const { pin, expense } = req.body;

  try {
    const jsonData = await readFile(expensesDataFile, pin);
    const prev = jsonData.find((obj) => obj.id === expense.id);
    const newData = jsonData.map((exp) => {
      if (exp.id === expense.id) {
        return expense;
      }
      return exp;
    });
    let result = await writeToFile(expensesDataFile, newData, pin);
    if (!result.error) {
      result = await updateAccount(
        accountsDataFile,
        pin,
        expense.account,
        expense.value * -1 + prev.value
      );
      if (result.error) {
        await writeToFile(expensesDataFile, jsonData, pin);
      }
    }
    res.json(result);
  } catch (error) {
    console.error("Error editing expense:", error);
    res.json({ error: true });
  }
});

module.exports = router;
