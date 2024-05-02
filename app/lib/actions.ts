'use server';

import { Account, Expense, Income, Transfer } from './definitions';
import { newExpense, deleteExpense, editExpense } from '@/app/lib/expenses';
import { deleteIncome, editIncome, newIncome } from '@/app/lib/income';
import { inactivateAccount, editAccount, newAccount } from '@/app/lib/accounts';
import { revalidatePath } from 'next/cache';
import { deleteTransfer, editTransfer, newTransfer } from './transfers';

export const newExpenseHandler = async (formData: FormData, pin: string) => {
  let id: string = new Date().toLocaleString().replace(/\s|\/|:|,|/g, '');
  let year: number = new Date(
    (formData.get('date') as string) || '',
  ).getFullYear();

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
    await newExpense(pin, expense);
  }
};

export const deleteHandler = async (id: string, type: string, pin: string) => {
  if (type === 'income') {
    await deleteIncome(id, pin);
    revalidatePath('/dashboard/income');
  } else if (type === 'expense') {
    await deleteExpense(id, pin);
    revalidatePath('/dashboard/expenses');
  } else if (type === 'account') {
    await inactivateAccount(id, pin);
    revalidatePath('/dashboard/accounts');
  } else if (type === 'transfer') {
    await deleteTransfer(id, pin);
    revalidatePath('/dashboard/transfers');
  }
};

export const updateHandler = async (
  item: Expense | Income | Account | Transfer,
  type: string,
  pin: string,
) => {
  if (type === 'income') {
    await editIncome(item as Income, pin);
  } else if (type === 'expense') {
    await editExpense(item as Expense, pin);
  } else if (type === 'account') {
    await editAccount(item as Account, pin);
  } else if (type === 'transfer') {
    await editTransfer(item as Transfer, pin);
  }
};

export const newIncomeHandler = async (formData: FormData, pin: string) => {
  let id: string = new Date().toLocaleString().replace(/\s|\/|:|,|/g, '');
  let year: number = new Date(
    (formData.get('date') as string) || '',
  ).getFullYear();

  const income: Income = {
    id: id,
    name: formData.get('name') as string,
    date: formData.get('date') as string,
    year: year,
    value: (formData.get('value') as unknown as number) || 0,
    account: formData.get('account') as string,
  };

  if (id) {
    await newIncome(pin, income);
    revalidatePath('/dashboard/income');
  }
};

export const newTransferHandler = async (formData: FormData, pin: string) => {
  let id: string = new Date().toLocaleString().replace(/\s|\/|:|,|/g, '');
  let year: number = new Date(
    (formData.get('date') as string) || '',
  ).getFullYear();

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
    await newTransfer(pin, transfer);
    revalidatePath('/dashboard/transfers');
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
    await newAccount(account, pin);
    revalidatePath('/dashboard/accounts');
  }
};
