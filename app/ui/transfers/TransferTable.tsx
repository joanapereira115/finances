import { Dispatch, SetStateAction } from 'react';
import { Account, Column, Income } from '@/app/lib/definitions';
import DataTable from '../ui/DataTable';
import { deleteHandler, updateHandler } from '@/app/lib/actions';

const columns: Column[] = [
  { id: 'name', name: 'Descrição' },
  { id: 'date', name: 'Data' },
  { id: 'value', name: 'Valor' },
  { id: 'account', name: 'Conta' },
  { id: 'actions', name: '' },
];

export default function TransferTable({
  income,
  accounts,
  pin,
  incomeUpdate,
}: {
  income: Income[];
  accounts: Account[];
  pin: string;
  incomeUpdate: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <DataTable
      items={income}
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
