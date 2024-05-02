'use server';

import { readFile, EXPENSES_FILE, INCOME_FILE, ACCOUNTS_FILE } from './files';
import {
  Expense,
  Income,
  History,
  Account,
  ExpensesByCat,
} from './definitions';
import { expenseCategories } from './categories';

/* retrieve the last five operations of a determined year */
export async function fetchHistory(pin: string, year: number) {
  let result: History[] = [];

  if (!pin) {
    return result;
  }
  let income = [];
  let expenses = [];
  let incomeData = await readFile(INCOME_FILE, pin);
  let expensesData = await readFile(EXPENSES_FILE, pin);

  if (incomeData?.length === 0 && expensesData?.length === 0) {
    return result;
  }

  if (incomeData) {
    income = incomeData.filter((income: Income) => +income.year === +year);
    income.forEach((inc: History) => {
      inc.type = 'income';
    });
  }

  if (expensesData) {
    expenses = expensesData.filter(
      (expense: Expense) => +expense.year === +year,
    );
    expenses.forEach((exp: History) => {
      exp.type = 'expense';
    });
  }

  let all = [...income, ...expenses];

  all.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  result = all.slice(0, 5);

  return result;
}

/* retrieve the year expenses, income and difference balance organized by months */
export async function fetchMonthlyBalance(pin: string, year: number) {
  let result = {
    income: [],
    expenses: [],
    difference: [],
  };

  if (!pin || !year) {
    return null;
  }
  let incomeData = await readFile(INCOME_FILE, pin);
  let expensesData = await readFile(EXPENSES_FILE, pin);

  if (incomeData?.length === 0 && expensesData?.length === 0) {
    return null;
  }

  let incomeVal = incomeData.filter((income: Income) => +income.year === +year);
  let expenseVal = expensesData.filter(
    (expense: Expense) => +expense.year === +year,
  );

  for (let i = 0; i < 12; i++) {
    let income = incomeVal.reduce((total: number, curr: Income) => {
      if (new Date(curr.date).getMonth() === +i) {
        return +total + +curr.value;
      }
      return +total;
    }, 0);

    let expense: number = expenseVal.reduce((total: number, curr: Expense) => {
      if (new Date(curr.date).getMonth() === +i) {
        return +total + +curr.value;
      }
      return +total;
    }, 0);

    result.income[i] =
      typeof income === 'number' && !isNaN(income)
        ? Number(income.toFixed(2))
        : 0;
    result.expenses[i] =
      typeof expense === 'number' && !isNaN(expense)
        ? Number(expense.toFixed(2))
        : 0;
    result.difference[i] = Number((+income - +expense).toFixed(2));
  }

  return result;
}

/* retrieve the balance of a determined year */
export async function fetchBalance(pin: string, year: number) {
  let result = {};

  if (!pin) {
    return null;
  }

  let incomeData = await readFile(INCOME_FILE, pin);
  let expensesData = await readFile(EXPENSES_FILE, pin);
  let accountsData = await readFile(ACCOUNTS_FILE, pin);

  if (
    incomeData?.length === 0 &&
    expensesData?.length === 0 &&
    accountsData?.length === 0
  ) {
    return null;
  }

  let total = accountsData.reduce((total: number, curr: Account) => {
    return +total + +curr.balance;
  }, 0);

  let incomeVal = incomeData.filter((income: Income) => +income.year === +year);
  let expenseVal = expensesData.filter(
    (expense: Expense) => +expense.year === +year,
  );

  let income: number = incomeVal.reduce((total: number, curr: Income) => {
    return +total + +curr.value;
  }, 0);

  let expense: number = expenseVal.reduce((total: number, curr: Expense) => {
    return +total + +curr.value;
  }, 0);

  result = {
    total: Number(total.toFixed(2)),
    income: Number(income.toFixed(2)),
    expense: Number(+expense.toFixed(2)),
    difference: Number((+income - +expense).toFixed(2)),
    percentage:
      +income !== 0
        ? Number(((+expense * 100) / +income).toFixed(2))
        : +expense !== 0
        ? +100
        : +0,
  };

  return result;
}

export async function getExpensesByCat(pin: string, year: number) {
  let result: ExpensesByCat[] = [];
  let expensesData = await readFile(EXPENSES_FILE, pin);
  if (!expensesData) {
    return result;
  }

  let expenseVal = expensesData.filter(
    (expense: Expense) => +expense.year === +year,
  );

  for (let catg of expenseCategories) {
    for (let i = 0; i < 12; i++) {
      let expense: number = expenseVal.reduce(
        (total: number, curr: Expense) => {
          if (
            curr.category === catg.id &&
            new Date(curr.date).getMonth() === i
          ) {
            return +total + +curr.value;
          }
          return +total;
        },
        0,
      );

      result.push({
        month: i,
        cat: catg.id,
        value: +expense.toFixed(2),
      });
    }
  }

  return result;
}
