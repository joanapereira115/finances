import { Dispatch, SetStateAction } from 'react';
import { Account, Column, Income } from '@/app/lib/definitions';
import DataTable from '../ui/DataTable';
import { deleteHandler, updateHandler } from '@/app/lib/actions';

const columns: Column[] = [
  { id: 'name', name: 'Descrição', sortable: true },
  { id: 'date', name: 'Data', sortable: true },
  { id: 'value', name: 'Valor', sortable: true },
  { id: 'account', name: 'Conta', sortable: false },
  { id: 'actions', name: '', sortable: false },
];

export default function IncomeTable({
  income,
  page,
  accounts,
  pin,
  incomeUpdate,
}: {
  income: Income[];
  page: string;
  accounts: Account[];
  pin: string;
  incomeUpdate: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <DataTable
      items={income}
      page={page}
      accounts={accounts}
      columns={columns}
      updateHandler={updateHandler}
      deleteHandler={deleteHandler}
      setUpdated={incomeUpdate}
      type="income"
      pin={pin}
    />
  );
}
