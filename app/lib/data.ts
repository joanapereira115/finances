import {
  Expense,
  Income,
  History,
  Account,
  ExpensesByCat,
  Balance,
} from './definitions';
import { expenseCategories, accountCategories } from '@/app/lib/categories';

/* retrieve the year expenses, income and difference balance organized by months */
export function fetchMonthlyBalance(year: number, incomeData, expensesData) {
  let result = {
    income: [],
    expenses: [],
    difference: [],
  };

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

/* retrieve the year expenses, income and difference accumulated by months */
export function fetchMonthlyAccumulated(
  year: number,
  incomeData,
  expensesData,
) {
  let result = {
    income: [],
    expenses: [],
    difference: [],
  };

  let totalIncome = 0;
  let totalExpenses = 0;
  let totalDiff = 0;

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

    let difference = Number((+income - +expense).toFixed(2));
    totalIncome += income;
    income = totalIncome;
    totalExpenses += expense;
    expense = totalExpenses;
    totalDiff += difference;
    difference = totalDiff;

    result.income[i] =
      typeof income === 'number' && !isNaN(income)
        ? Number(income.toFixed(2))
        : 0;
    result.expenses[i] =
      typeof expense === 'number' && !isNaN(expense)
        ? Number(expense.toFixed(2))
        : 0;
    result.difference[i] =
      typeof difference === 'number' && !isNaN(difference)
        ? Number(difference.toFixed(2))
        : 0;
  }

  return result;
}

/* retrieve the balance of a determined year */
export function fetchBalance(year, accountsData, expensesData, incomeData) {
  let result: Balance | {} = {};

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
    percentage: Math.round(
      +income !== 0
        ? Number(((+expense * 100) / +income).toFixed(2))
        : +expense !== 0
          ? +100
          : +0,
    ),
  };

  return result;
}

export function getExpensesByCat(expensesData: Expense[]) {
  let result: ExpensesByCat[] = [];

  if (!expensesData) {
    return result;
  }

  for (let catg of expenseCategories) {
    for (let i = 0; i < 12; i++) {
      let expense: number = expensesData.reduce(
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

export function getDescFromAccountType(type: string) {
  let accountCategoriesCopy = [...accountCategories];
  const category = accountCategoriesCopy.find((cat) => cat.id === type);
  return category?.description;
}

export function getCategoryDesc(id: string) {
  const category = expenseCategories.find((cat) => cat.id === id);
  return category?.name;
}

export function fetchTopCatg(year: number, expensesData) {
  let result = [];

  if (expensesData?.length === 0) {
    return result;
  }

  let expenseVal = expensesData.filter(
    (expense: Expense) => +expense.year === +year,
  );

  let totalExpensesValue: number = expenseVal.reduce(
    (total: number, curr: Expense) => {
      return +total + +curr.value;
    },
    0,
  );

  for (let catg of expenseCategories) {
    let expense: number = expenseVal.reduce((total: number, curr: Expense) => {
      if (curr.category === catg.id) {
        return +total + +curr.value;
      }
      return +total;
    }, 0);

    result.push({
      cat: getCategoryDesc(catg.id),
      value: +expense.toFixed(2),
    });
  }

  result.sort((a, b) => {
    if (a.value < b.value) {
      return 1;
    }
    if (a.value > b.value) {
      return -1;
    }
    return 0; // a.tag === b.tag
  });

  result = result.slice(0, 5);

  let final = [];
  let percentage = 0;

  result.forEach((cat) => {
    percentage += +((+cat.value * 100) / +totalExpensesValue).toFixed(2);
    final.push({
      cat: cat.cat,
      value: Math.round(+((+cat.value * 100) / +totalExpensesValue)).toFixed(0),
    });
  });

  final.push({
    cat: 'Outros',
    value: Math.round(100 - +percentage).toFixed(0),
  });

  return final;
}
