import { Dispatch, SetStateAction } from 'react';
import { Account, Column, Transfer } from '@/app/lib/definitions';
import DataTable from '../ui/DataTable';
import { deleteHandler, updateHandler } from '@/app/lib/actions';

const columns: Column[] = [
  { id: 'name', name: 'Descrição' },
  { id: 'date', name: 'Data' },
  { id: 'value', name: 'Valor' },
  { id: 'accountFrom', name: 'Da conta' },
  { id: 'accountTo', name: 'Para a conta' },
  { id: 'actions', name: '' },
];

export default function TransferTable({
  transfers,
  accounts,
  pin,
  transfersUpdate,
}: {
  transfers: Transfer[];
  accounts: Account[];
  pin: string;
  transfersUpdate: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <DataTable
      items={transfers}
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
