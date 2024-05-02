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

export type Transfer = {
  id: string;
  name: string;
  date: string;
  year: number;
  value: number;
  accountFrom: string;
  accountTo: string;
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
  withHolding: number;
  socialSecurity: number;
  youngIrs: number | string;
  deductions: number;
  countyAid: number;
};

export type CalculatedIRS = {
  collIncome: number; // Rendimento coletável
  impDetermined: number; // Importância apurada
  exemptTax: number; // Imposto de rendimentos isentos
  totCollect: number; // Coleta total
  irsToPay: number; // Valor a pagar
  irsToReceive: number; // Valor a receber
  tax: number; // Taxa
  parcel: number; // Parcela a abater
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
