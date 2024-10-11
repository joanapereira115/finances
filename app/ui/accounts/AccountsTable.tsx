import { Dispatch, SetStateAction } from 'react';
import { Account, Column } from '@/app/lib/definitions';
import DataTable from '../ui/DataTable';
import { deleteHandler, updateHandler } from '@/app/lib/actions';

const columns: Column[] = [
  { id: 'name', name: 'Descrição', sortable: true },
  { id: 'balance', name: 'Valor', sortable: true },
  { id: 'type', name: 'Tipo', sortable: false },
  { id: 'active', name: 'Ativa', sortable: false },
  { id: 'actions', name: '', sortable: false },
];

export default function AccountsTable({
  accounts,
  page,
  pin,
  accountUpdate,
}: {
  accounts: Account[];
  page: string;
  pin: string;
  accountUpdate: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <DataTable
      items={accounts}
      page={page}
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
