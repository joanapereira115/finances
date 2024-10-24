'use client';

import { useSearchParams } from 'next/navigation';

import { Account } from '@/app/lib/definitions';
import Pagination from '@/app/ui/ui/Pagination';
import AccountsTable from '@/app/ui/accounts/AccountsTable';
import EmptyData from '@/app/ui/ui/EmptyData';

export default function Accounts({ accounts }: { accounts: Account[] }) {
  if (!accounts || accounts.length === 0) {
    return <EmptyData />;
  }

  const searchParams = useSearchParams();
  const page: string = searchParams.get('page') || '1';

  return (
    <div>
      <div className="justify-center">
        <AccountsTable accounts={accounts} page={page} />
        <div className="text-center">
          <Pagination totalElems={accounts.length} page={page} />
        </div>
      </div>
    </div>
  );
}
