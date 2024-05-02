'use server';

import { writeToFile, readFile, EXPENSES_FILE, ACCOUNTS_FILE } from './files';
import { updateAccount } from './accounts';
import { Expense } from './definitions';

/* create new expense */
export async function newExpense(pin: string, expense: Expense) {
  try {
    const jsonData = await readFile(EXPENSES_FILE, pin);

    if (jsonData.length > 0) {
      jsonData.push(expense);
      await writeToFile(EXPENSES_FILE, jsonData, pin);
      await updateAccount(
        ACCOUNTS_FILE,
        pin,
        expense.account,
        +expense.value * -1,
      );
      return {};
    } else {
      let result = await writeToFile(EXPENSES_FILE, [expense], pin);
      await updateAccount(
        ACCOUNTS_FILE,
        pin,
        expense.account,
        +expense.value * -1,
      );
      return result;
    }
  } catch (error) {
    console.error('Error adding expense data:', error);
  }
}

/* retrieve the list of expenses of a determined year */
export async function fetchExpenses(pin: string, year: number) {
  let result: Expense[] = [];
  try {
    let expensesData = await readFile(EXPENSES_FILE, pin);

    let expenses = expensesData?.filter(
      (expense: Expense) => +expense.year === +year,
    );

    expenses.sort((a: Expense, b: Expense) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    result = expenses;

    return result;
  } catch (error) {
    console.error('Error reading file: ', EXPENSES_FILE, error);
    return [];
  }
}

/* delete existing expense */
export async function deleteExpense(id: string, pin: string) {
  try {
    let expensesData = await readFile(EXPENSES_FILE, pin);
    const prev = expensesData.find((obj: Expense) => obj.id === id);
    const newData = expensesData.filter(
      (expense: Expense) => expense.id !== id,
    );
    await writeToFile(EXPENSES_FILE, newData, pin);
    await updateAccount(ACCOUNTS_FILE, pin, prev.account, +prev.value);
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
}

/* edit existing expense */
// ERRO!!! verificar em que conta estava antes para atualizar!!!!!
export async function editExpense(expense: Expense, pin: string) {
  try {
    const jsonData = await readFile(EXPENSES_FILE, pin);
    const prev = jsonData.find((obj: Expense) => obj.id === expense.id);
    const newData = jsonData.map((exp: Expense) => {
      if (exp.id === expense.id) {
        return expense;
      }
      return exp;
    });

    await writeToFile(EXPENSES_FILE, newData, pin);
    await updateAccount(
      ACCOUNTS_FILE,
      pin,
      expense.account,
      +expense.value * -1,
    );
    await updateAccount(ACCOUNTS_FILE, pin, prev.account, +prev.value);
  } catch (error) {
    console.error('Error editing expense:', error);
  }
}
