import { Column, Transfer } from '@/app/lib/definitions';
import DataTable from '../ui/DataTable';

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
}: {
  transfers: Transfer[];
  page: string;
}) {
  return (
    <DataTable
      items={transfers}
      page={page}
      columns={columns}
      type="transfer"
    />
  );
}
