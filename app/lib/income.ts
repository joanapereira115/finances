'use server';

import { Income } from './definitions';
import { writeToFile, readFile, INCOME_FILE, ACCOUNTS_FILE } from './files';
import { updateAccount } from './accounts';

/* create new income */
export async function newIncome(pin: string, income: Income) {
  try {
    const jsonData = await readFile(INCOME_FILE, pin);

    if (jsonData.length > 0) {
      jsonData.push(income);
      await writeToFile(INCOME_FILE, jsonData, pin);
      await updateAccount(ACCOUNTS_FILE, pin, income.account, income.value);
      return {};
    } else {
      await writeToFile(INCOME_FILE, [income], pin);
      await updateAccount(ACCOUNTS_FILE, pin, income.account, income.value);
    }
  } catch (error) {
    console.error('Error adding income data:', error);
    return { error: true };
  }
}

/* retrieve the income of a determined year */
export async function fetchIncome(pin: string, year: number) {
  let result: Income[] = [];

  try {
    let incomeData = await readFile(INCOME_FILE, pin);

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
export async function deleteIncome(id: string, pin: string) {
  try {
    let incomeData = await readFile(INCOME_FILE, pin);
    const prev = incomeData.find((obj: Income) => obj.id === id);
    const newData = incomeData.filter((income: Income) => income.id !== id);

    await writeToFile(INCOME_FILE, newData, pin);
    await updateAccount(ACCOUNTS_FILE, pin, prev.account, +prev.value * -1);
  } catch (error) {
    console.error('Error deleting income:', error);
  }
}

/* edit existing income */
export async function editIncome(income: Income, pin: string) {
  try {
    let incomeData = await readFile(INCOME_FILE, pin);
    const prev = incomeData.find((obj: Income) => obj.id === income.id);
    const newData = incomeData.map((inc: Income) => {
      if (inc.id === income.id) {
        return income;
      }
      return inc;
    });

    await writeToFile(INCOME_FILE, newData, pin);
    await updateAccount(
      ACCOUNTS_FILE,
      pin,
      income.account,
      +prev.value * -1 + +income.value,
    );
  } catch (error) {
    console.error('Error editing income:', error);
  }
}
