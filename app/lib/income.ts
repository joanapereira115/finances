'use server';

import { Income } from './definitions';
import { writeToFile, readFile, getIncomeFile, ACCOUNTS_FILE } from './files';
import { updateAccount } from './accounts';

/* create new income */
export async function newIncome(pin: string, income: Income) {
  let income_file = getIncomeFile(income.year);
  try {
    const jsonData = await readFile(income_file, pin);

    if (jsonData.length > 0) {
      jsonData.push(income);
      await writeToFile(income_file, jsonData, pin);
      await updateAccount(ACCOUNTS_FILE, pin, income.account, income.value);
      return jsonData;
    } else {
      await writeToFile(income_file, [income], pin);
      await updateAccount(ACCOUNTS_FILE, pin, income.account, income.value);
      return [income];
    }
  } catch (error) {
    console.error('Error adding income data:', error);
    return [];
  }
}

/* retrieve the income of a determined year */
export async function fetchIncome(pin: string, year: number) {
  let income_file = getIncomeFile(year);
  let result: Income[] = [];

  try {
    let incomeData = await readFile(income_file, pin);

    let income = incomeData?.filter((income: Income) => +income.year === +year);
    income.sort((a: Income, b: Income) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    result = income;
    return result;
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
}

/* delete existing income */
export async function deleteIncome(id: string, year: number, pin: string) {
  let income_file = getIncomeFile(year);
  try {
    let incomeData = await readFile(income_file, pin);
    const prev = incomeData.find((obj: Income) => obj.id === id);
    const newData = incomeData.filter((income: Income) => income.id !== id);

    await writeToFile(income_file, newData, pin);
    await updateAccount(ACCOUNTS_FILE, pin, prev.account, +prev.value * -1);
    return newData;
  } catch (error) {
    console.error('Error deleting income:', error);
    return [];
  }
}

/* edit existing income */
export async function editIncome(income: Income, pin: string) {
  let income_file = getIncomeFile(income.year);
  try {
    let incomeData = await readFile(income_file, pin);
    const prev = incomeData.find((obj: Income) => obj.id === income.id);
    const newData = incomeData.map((inc: Income) => {
      if (inc.id === income.id) {
        return income;
      }
      return inc;
    });

    await writeToFile(income_file, newData, pin);
    await updateAccount(ACCOUNTS_FILE, pin, income.account, +income.value);
    await updateAccount(ACCOUNTS_FILE, pin, prev.account, +prev.value * -1);
    return newData;
  } catch (error) {
    console.error('Error editing income:', error);
    return [];
  }
}
