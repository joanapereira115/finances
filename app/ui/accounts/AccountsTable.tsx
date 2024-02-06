import { Dispatch, SetStateAction } from 'react';
import { Account, Column } from '@/app/lib/definitions';
import DataTable from '../ui/DataTable';
import { deleteHandler, updateHandler } from '@/app/lib/actions';

const columns: Column[] = [
  { id: 'name', name: 'Descrição' },
  { id: 'balance', name: 'Valor' },
  { id: 'type', name: 'Tipo' },
  { id: 'active', name: 'Ativa' },
  { id: 'actions', name: '' },
];

export default function AccountsTable({
  accounts,
  pin,
  accountUpdate,
}: {
  accounts: Account[];
  pin: string;
  accountUpdate: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <DataTable
      items={accounts}
      accounts={accounts}
      columns={columns}
      updateHandler={updateHandler}
      deleteHandler={deleteHandler}
      setUpdated={accountUpdate}
      type="account"
      pin={pin}
    />
  );
}
