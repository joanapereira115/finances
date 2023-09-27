var express = require("express");
const path = require("path");

const { readFile } = require("../logic/files.js");

var router = express.Router();

const homeDirectory = process.env.HOME || process.env.USERPROFILE;
const targetDirectory = path.join(homeDirectory, "finances");
const expensesDataFile = path.join(targetDirectory, "expensesData.json");
const incomeDataFile = path.join(targetDirectory, "incomeData.json");

/* retrieve the balance of a determined year */
router.post("/getBalanceByYear", async (req, res) => {
  const { pin, year } = req.body;
  let incomeData = await readFile(incomeDataFile, pin);
  const income = incomeData.filter((income) => income.year === year);
  let expensesData = await readFile(expensesDataFile, pin);
  const expenses = expensesData.filter((expense) => expense.year === year);

  const incomeValue = income.reduce((total, curr) => {
    const amount = parseFloat(curr.value.toFixed(2));
    if (!isNaN(amount)) {
      return total + amount;
    }
    return total;
  }, 0);

  const expenseValue = expenses.reduce((total, curr) => {
    const amount = parseFloat(curr.value.toFixed(2));
    if (!isNaN(amount)) {
      return total + amount;
    }
    return total;
  }, 0);

  const percentage = parseFloat(
    ((expenseValue * 100) / incomeValue).toFixed(2)
  );

  res.json({
    income: incomeValue,
    expense: expenseValue,
    difference: incomeValue - expenseValue,
    percentage: percentage,
  });
});

/* retrieve the last fice operations of a determined year */
router.post("/getLatestByYear", async (req, res) => {
  const { pin, year } = req.body;
  let incomeData = await readFile(incomeDataFile, pin);
  const income = incomeData.filter((income) => income.year === year);
  let expensesData = await readFile(expensesDataFile, pin);
  const expenses = expensesData.filter((expense) => expense.year === year);

  let all = [...income, ...expenses];

  all.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  res.json(all.slice(0, 5));
});

/* retrieve the year expenses, income and difference balance organized by months */
router.post("/getMonthlyBalance", async (req, res) => {
  const { pin, year } = req.body;
  let incomeData = await readFile(incomeDataFile, pin);
  const income = incomeData.filter((income) => income.year === year);
  let expensesData = await readFile(expensesDataFile, pin);
  const expenses = expensesData.filter((expense) => expense.year === year);

  let monthlyBalance = [];

  for (let i = 0; i < 12; i++) {
    monthlyBalance[i] = {};
    monthlyBalance[i].month = i;
    monthlyBalance[i].income = income.reduce((total, curr) => {
      if (new Date(curr.date).getMonth() === i) {
        const amount = parseFloat(curr.value.toFixed(2));
        if (!isNaN(amount)) {
          return total + amount;
        }
        return total;
      }
      return total;
    }, 0);
    monthlyBalance[i].expenses = expenses.reduce((total, curr) => {
      if (new Date(curr.date).getMonth() === i) {
        const amount = parseFloat(curr.value.toFixed(2));
        if (!isNaN(amount)) {
          return total + amount;
        }
        return total;
      }
      return total;
    }, 0);
    monthlyBalance[i].difference =
      monthlyBalance[i].income - monthlyBalance[i].expenses;
    monthlyBalance[i].percentage = parseFloat(
      (monthlyBalance[i].expenses * 100) / monthlyBalance[i].income
    ).toFixed(2);
  }

  res.json(monthlyBalance);
});

module.exports = router;
