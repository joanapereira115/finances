'use server';

import { Account, Expense, Income, Transfer } from './definitions';
import { newExpense } from '@/app/lib/expenses';
import { newIncome } from '@/app/lib/income';
import { newAccount } from '@/app/lib/accounts';
import { newTransfer } from './transfers';
import { initializeFolder } from './auth';

export const newExpenseHandler = async (formData: FormData, pin: string) => {
  let id: string = new Date().toLocaleString().replace(/\s|\/|:|,|/g, '');
  let year: number = new Date(
    (formData.get('date') as string) || '',
  ).getFullYear();
  let currentYear: number | undefined = new Date().getFullYear();

  if (year && year !== currentYear) {
    await initializeFolder(year);
  }

  const expense: Expense = {
    id: id,
    name: formData.get('name') as string,
    date: formData.get('date') as string,
    year: year,
    value: (formData.get('value') as unknown as number) || 0,
    nif: (formData.get('nif') as string) === 'on' ? true : false,
    iva: (formData.get('iva') as unknown as number) || 0,
    account: formData.get('account') as string,
    category: formData.get('category') as string,
  };

  if (id) {
    return await newExpense(pin, expense);
  }
};

export const newIncomeHandler = async (formData: FormData, pin: string) => {
  let id: string = new Date().toLocaleString().replace(/\s|\/|:|,|/g, '');
  let year: number = new Date(
    (formData.get('date') as string) || '',
  ).getFullYear();

  let currentYear: number | undefined = new Date().getFullYear();

  if (year && year !== currentYear) {
    await initializeFolder(year);
  }

  const income: Income = {
    id: id,
    name: formData.get('name') as string,
    date: formData.get('date') as string,
    year: year,
    value: (formData.get('value') as unknown as number) || 0,
    account: formData.get('account') as string,
  };

  if (id) {
    return await newIncome(pin, income);
  }
};

export const newTransferHandler = async (formData: FormData, pin: string) => {
  let id: string = new Date().toLocaleString().replace(/\s|\/|:|,|/g, '');
  let year: number = new Date(
    (formData.get('date') as string) || '',
  ).getFullYear();

  let currentYear: number | undefined = new Date().getFullYear();

  if (year && year !== currentYear) {
    await initializeFolder(year);
  }

  const transfer: Transfer = {
    id: id,
    name: formData.get('name') as string,
    date: formData.get('date') as string,
    year: year,
    value: (formData.get('value') as unknown as number) || 0,
    accountFrom: formData.get('accountFrom') as string,
    accountTo: formData.get('accountTo') as string,
  };

  if (id) {
    return await newTransfer(pin, transfer);
  }
};

export const newAccountHandler = async (formData: FormData, pin: string) => {
  const date = new Date().toLocaleString().replace(/\s|\/|:|,|/g, '');
  const type = formData.get('type') as string;
  let id: string = `${type}${date}`;

  const account: Account = {
    id: id,
    name: formData.get('name') as string,
    balance: (formData.get('balance') as unknown as number) || 0,
    type: type,
    active: (formData.get('active') as string) === 'on' ? true : false,
  };

  if (id) {
    return await newAccount(account, pin);
  }
};
