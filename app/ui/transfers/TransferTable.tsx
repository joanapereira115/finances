import { Dispatch, SetStateAction } from 'react';
import { Account, Column, Transfer } from '@/app/lib/definitions';
import DataTable from '../ui/DataTable';
import { deleteHandler, updateHandler } from '@/app/lib/actions';

const columns: Column[] = [
  { id: 'name', name: 'Descrição', sortable: true },
  { id: 'date', name: 'Data', sortable: true },
  { id: 'value', name: 'Valor', sortable: true },
  { id: 'accountFrom', name: 'Da conta', sortable: false },
  { id: 'accountTo', name: 'Para a conta', sortable: false },
  { id: 'actions', name: '', sortable: false },
];

export default function TransferTable({
  transfers,
  page,
  accounts,
  pin,
  transfersUpdate,
}: {
  transfers: Transfer[];
  page: string;
  accounts: Account[];
  pin: string;
  transfersUpdate: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <DataTable
      items={transfers}
      page={page}
      accounts={accounts}
      columns={columns}
      updateHandler={updateHandler}
      deleteHandler={deleteHandler}
      setUpdated={transfersUpdate}
      type="transfer"
      pin={pin}
    />
  );
}
