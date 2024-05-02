import { Dispatch, SetStateAction } from 'react';
import { Account, Column, Expense } from '@/app/lib/definitions';
import { deleteHandler, updateHandler } from '@/app/lib/actions';
import DataTable from '../ui/DataTable';

const columns: Column[] = [
  { id: 'name', name: 'Descrição' },
  { id: 'date', name: 'Data' },
  { id: 'value', name: 'Valor' },
  { id: 'account', name: 'Conta' },
  { id: 'category', name: 'Categoria' },
  { id: 'nif', name: 'Fatura?' },
  { id: 'iva', name: 'IRS' },
  { id: 'actions', name: '' },
];

export default function ExpensesTable({
  expenses,
  accounts,
  pin,
  expenseUpdate,
}: {
  expenses: Expense[];
  accounts: Account[];
  pin: string;
  expenseUpdate: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <DataTable
      items={expenses}
      accounts={accounts}
      columns={columns}
      updateHandler={updateHandler}
      deleteHandler={deleteHandler}
      setUpdated={expenseUpdate}
      type="expense"
      pin={pin}
    />
  );
}
