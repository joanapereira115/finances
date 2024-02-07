// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

export type Expense = {
  id: string;
  name: string;
  date: string;
  year: number;
  value: number;
  nif: boolean;
  iva: number;
  account: string;
  category: string;
};

export type Income = {
  id: string;
  name: string;
  date: string;
  year: number;
  value: number;
  account: string;
};

export type History = {
  id: string;
  name: string;
  date: string;
  year: number;
  value: number;
  nif: boolean;
  iva: number;
  account: string;
  category: string;
  type: string;
};

export type Account = {
  id: string;
  name: string;
  balance: number;
  type: string;
  active: boolean;
};

export type IRSDef = {
  year: number;
  type: string;
  grossIncome: number;
  withholding: number;
  socialSecurity: number;
  youngIrs: number | string;
  deductions: number;
  countyAid: number;
};

export type CalculatedIRS = {
  rendCol: number;
  impApur: number;
  impIse: number;
  colTot: number;
  IRSpay: number;
  IRSreceive: number;
  tax: number;
  parcel: number;
};

export type MonthlyBalance = {
  month: number;
  income: number;
  expenses: number;
  difference: number;
  percentage: number;
};

export type Balance = {
  total: number;
  income: number;
  expense: number;
  difference: number;
  percentage: number;
};

export type Column = {
  id: string;
  name: string;
};

export type ExpensesByCat = {
  month: number;
  cat: string;
  value: number;
};
