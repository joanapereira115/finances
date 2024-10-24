import { Account, Column } from '@/app/lib/definitions';
import DataTable from '@/app/ui/ui/DataTable';

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
}: {
  accounts: Account[];
  page: string;
}) {
  return (
    <DataTable
      items={accounts}
      page={page}
      columns={columns}
      type="account"
    />
  );
}
