'use server';

import { writeToFile, readFile, getExpensesFile, ACCOUNTS_FILE } from './files';
import { updateAccount } from './accounts';
import { Expense } from './definitions';

/* create new expense */
export async function newExpense(pin: string, expense: Expense) {
  try {
    let expenses_file = getExpensesFile(expense.year);
    const jsonData = await readFile(expenses_file, pin);

    if (jsonData.length > 0) {
      jsonData.push(expense);
      await writeToFile(expenses_file, jsonData, pin);
      await updateAccount(
        ACCOUNTS_FILE,
        pin,
        expense.account,
        +expense.value * -1,
      );
      return jsonData;
    } else {
      let result = await writeToFile(expenses_file, [expense], pin);
      await updateAccount(
        ACCOUNTS_FILE,
        pin,
        expense.account,
        +expense.value * -1,
      );
      return [expense];
    }
  } catch (error) {
    console.error('Error adding expense data:', error);
  }
}

/* retrieve the list of expenses of a determined year */
export async function fetchExpenses(pin: string, year: number) {
  let expenses_file = getExpensesFile(year);
  let result: Expense[] = [];
  try {
    let expenses = await readFile(expenses_file, pin);

    expenses.sort((a: Expense, b: Expense) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    result = expenses;

    return result;
  } catch (error) {
    console.error('Error reading file: ', expenses_file, error);
    return [];
  }
}

/* delete existing expense */
export async function deleteExpense(id: string, year: number, pin: string) {
  let expenses_file = getExpensesFile(year);
  try {
    let expensesData = await readFile(expenses_file, pin);
    const prev = expensesData.find((obj: Expense) => obj.id === id);
    const newData = expensesData.filter(
      (expense: Expense) => expense.id !== id,
    );
    await writeToFile(expenses_file, newData, pin);
    await updateAccount(ACCOUNTS_FILE, pin, prev.account, +prev.value);
    return newData;
  } catch (error) {
    console.error('Error deleting expense:', error);
    return [];
  }
}

/* edit existing expense */
export async function editExpense(expense: Expense, pin: string) {
  let expenses_file = getExpensesFile(expense.year);
  try {
    const jsonData = await readFile(expenses_file, pin);
    const prev = jsonData.find((obj: Expense) => obj.id === expense.id);
    const newData = jsonData.map((exp: Expense) => {
      if (exp.id === expense.id) {
        return expense;
      }
      return exp;
    });

    await writeToFile(expenses_file, newData, pin);
    await updateAccount(
      ACCOUNTS_FILE,
      pin,
      expense.account,
      +expense.value * -1,
    );
    await updateAccount(ACCOUNTS_FILE, pin, prev.account, +prev.value);
    return newData;
  } catch (error) {
    console.error('Error editing expense:', error);
    return [];
  }
}
