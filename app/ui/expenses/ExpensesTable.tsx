import { Column, Expense } from '@/app/lib/definitions';
import DataTable from '@/app/ui/ui/DataTable';

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
}: {
  expenses: Expense[];
  page: string;
}) {
  return (
    <DataTable items={expenses} page={page} columns={columns} type="expense" />
  );
}
