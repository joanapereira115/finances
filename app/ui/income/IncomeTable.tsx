import { Column, Income } from '@/app/lib/definitions';
import DataTable from '../ui/DataTable';

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
}: {
  income: Income[];
  page: string;
}) {
  return (
    <DataTable items={income} page={page} columns={columns} type="income" />
  );
}
