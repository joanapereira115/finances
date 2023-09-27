var express = require("express");
const path = require("path");

const { readFile, writeToFile } = require("../logic/files.js");
const { updateAccount } = require("../logic/finances.js");

var router = express.Router();

const homeDirectory = process.env.HOME || process.env.USERPROFILE;
const targetDirectory = path.join(homeDirectory, "finances");
const incomeDataFile = path.join(targetDirectory, "incomeData.json");
const accountsDataFile = path.join(targetDirectory, "accountsData.json");

/* retrieve the list of income of a determined year */
router.post("/getByYear", async (req, res) => {
  const { pin, year } = req.body;
  let incomeData = await readFile(incomeDataFile, pin);
  const income = incomeData.filter((income) => income.year === year);
  res.json(income);
});

/* create new income */
router.post("/new", async (req, res) => {
  const { pin, income } = req.body;

  try {
    const jsonData = await readFile(incomeDataFile, pin);

    if (jsonData.length > 0) {
      jsonData.push(income);
      let result = await writeToFile(incomeDataFile, jsonData, pin);
      if (!result.error) {
        result = await updateAccount(
          accountsDataFile,
          pin,
          income.account,
          income.value
        );
        if (result.error) {
          await writeToFile(
            incomeDataFile,
            jsonData.map((inc) => inc.id != income.id),
            pin
          );
        }
      }
      res.json(result);
    } else {
      let result = await writeToFile(incomeDataFile, [income], pin);
      res.json(result);
    }
  } catch (error) {
    console.error("Error adding income data:", error);
    res.json({ error: true });
  }
});

/* delete existing income */
router.post("/delete", async (req, res) => {
  const { pin, id } = req.body;

  try {
    const jsonData = await readFile(incomeDataFile, pin);
    const prev = jsonData.find((obj) => obj.id === id);
    const newData = jsonData.filter((income) => income.id !== id);
    let result = await writeToFile(incomeDataFile, newData, pin);
    if (!result.error) {
      result = await updateAccount(
        accountsDataFile,
        pin,
        prev.account,
        prev.value * -1
      );
      if (result.error) {
        await writeToFile(incomeDataFile, [...jsonData, prev], pin);
      }
    }
    res.json(result);
  } catch (error) {
    console.error("Error deleting income:", error);
    res.json({ error: true });
  }
});

/* edit existing income */
router.post("/edit", async (req, res) => {
  const { pin, income } = req.body;

  try {
    const jsonData = await readFile(incomeDataFile, pin);
    const prev = jsonData.find((obj) => obj.id === income.id);
    const newData = jsonData.map((exp) => {
      if (exp.id === income.id) {
        return income;
      }
      return exp;
    });
    let result = await writeToFile(incomeDataFile, newData, pin);
    if (!result.error) {
      result = await updateAccount(
        accountsDataFile,
        pin,
        income.account,
        prev.value * -1 + income.value
      );
      if (result.error) {
        await writeToFile(incomeDataFile, jsonData, pin);
      }
    }
    res.json(result);
  } catch (error) {
    console.error("Error editing income:", error);
    res.json({ error: true });
  }
});

module.exports = router;
