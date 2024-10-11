import { Dispatch, SetStateAction } from 'react';
import { Account, Column, Expense } from '@/app/lib/definitions';
import { deleteHandler, updateHandler } from '@/app/lib/actions';
import DataTable from '../ui/DataTable';

const columns: Column[] = [
  { id: 'name', name: 'Descrição', sortable: true },
  { id: 'date', name: 'Data', sortable: true },
  { id: 'value', name: 'Valor', sortable: true },
  { id: 'account', name: 'Conta', sortable: false },
  { id: 'category', name: 'Categoria', sortable: false },
  { id: 'nif', name: 'Fatura?', sortable: false },
  { id: 'iva', name: 'IRS', sortable: false },
  { id: 'actions', name: '', sortable: false },
];

export default function ExpensesTable({
  expenses,
  page,
  accounts,
  pin,
  expenseUpdate,
}: {
  expenses: Expense[];
  page: string;
  accounts: Account[];
  pin: string;
  expenseUpdate: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <DataTable
      items={expenses}
      page={page}
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
