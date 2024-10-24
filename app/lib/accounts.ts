'use server';

import {
  writeToFile,
  readFile,
  ACCOUNTS_FILE,
  EXPENSES_FILE,
  INCOME_FILE,
} from './files';
import { Account, Income, Expense } from './definitions';

export async function fetchAccounts(pin: string) {
  let result = [];

  if (!pin) {
    return result;
  }
  let accountsData = await readFile(ACCOUNTS_FILE, pin);

  accountsData.sort((a: Account, b: Account) => {
    const catA = a.type;
    const catB = b.type;

    if (catA === catB) {
      return 0;
    } else if (
      (catA === 'CARD' && catB !== 'CARD') ||
      (catA === 'MONE' && catB !== 'CARD') ||
      (catA === 'MEAL' && catB !== 'CARD' && catB !== 'MONE') ||
      (catA === 'SAVI' &&
        catB !== 'CARD' &&
        catB !== 'MONE' &&
        catB !== 'MEAL') ||
      (catA === 'INVE' &&
        catB !== 'CARD' &&
        catB !== 'MONE' &&
        catB !== 'MEAL' &&
        catB !== 'SAVI')
    ) {
      return -1;
    } else {
      return 1;
    }
  });

  const accounts = accountsData.map((account: Account) => {
    return { ...account, balance: Number((+account.balance).toFixed(2)) };
  });

  return accounts;
}

export async function updateAccount(
  filename: string,
  pin: string,
  accountId: string,
  amount: number,
) {
  try {
    const jsonData = await readFile(filename, pin);

    const newData = jsonData.map((account: Account) => {
      if (account.id === accountId) {
        return { ...account, balance: +account.balance + +amount };
      }
      return account;
    });
    let result = await writeToFile(filename, newData, pin);
    return result;
  } catch (error) {
    console.log('Error updating accounts data:', error);
  }
}

export async function newAccount(account: Account, pin: string) {
  try {
    const jsonData = await readFile(ACCOUNTS_FILE, pin);

    if (jsonData.length > 0) {
      jsonData.push(account);
      await writeToFile(ACCOUNTS_FILE, jsonData, pin);
      return jsonData;
    } else {
      await writeToFile(ACCOUNTS_FILE, [account], pin);
      return [account];
    }
  } catch (error) {
    console.log('Error adding account data:', error);
  }
}

export async function inactivateAccount(id: string, pin: string) {
  try {
    const jsonData = await readFile(ACCOUNTS_FILE, pin);

    if (jsonData.length > 0) {
      const newData = jsonData.map((account: Account) => {
        if (account.id === id) {
          return { ...account, active: false };
        }
        return account;
      });

      await writeToFile(ACCOUNTS_FILE, newData, pin);
      return newData;
    } else {
      console.log('Error inactivating account');
      return jsonData;
    }
  } catch (error) {
    console.log('Error inactivating account:', error);
    return [];
  }
}

export async function editAccount(account: Account, pin: string) {
  try {
    const jsonData = await readFile(ACCOUNTS_FILE, pin);
    const newData = jsonData.map((acc: Account) => {
      if (acc.id === account.id) {
        return account;
      }
      return acc;
    });

    await writeToFile(ACCOUNTS_FILE, newData, pin);
    return newData;
  } catch (error) {
    console.log('Error editing account:', error);
    return [];
  }
}

export async function getAvailableYears(pin: string) {
  let result = { availableYears: [], currentYear: undefined };

  if (!pin) {
    return result;
  }

  try {
    let incomeData = await readFile(INCOME_FILE, pin);
    let expensesData = await readFile(EXPENSES_FILE, pin);

    if (!incomeData && !expensesData) {
      return result;
    }

    let incomeYears = Array.from(
      new Set(incomeData.map((item: Income) => item.year)),
    );
    let expenseYears = Array.from(
      new Set(expensesData.map((item: Expense) => item.year)),
    );

    let allYears = [...incomeYears, ...expenseYears];
    let availableYears = Array.from(new Set(allYears));

    availableYears.sort((a: unknown, b: unknown) => {
      return Number(a) - Number(b);
    });

    let currentYear: number | undefined = new Date().getFullYear();
    if (!availableYears.includes(currentYear)) {
      currentYear = undefined;
    }

    return { availableYears, currentYear };
  } catch (error) {
    console.log('Error getting years:', error);
    return result;
  }
}
