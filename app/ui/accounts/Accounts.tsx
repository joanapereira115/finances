'use client';

import { Dispatch, SetStateAction } from 'react';
import { useSearchParams } from 'next/navigation';

import { Account } from '@/app/lib/definitions';
import Pagination from '@/app/ui/ui/Pagination';
import AccountsTable from './AccountsTable';
import EmptyData from '../ui/EmptyData';

export default async function Accounts({
  accounts,
  pin,
  updateHandler,
}: {
  accounts: Account[];
  pin: string;
  updateHandler: Dispatch<SetStateAction<boolean>>;
}) {
  if (!accounts || accounts.length === 0) {
    return <EmptyData />;
  }

  const searchParams = useSearchParams();
  const page: string = searchParams.get('page') || '1';

  return (
    <div>
      <div className="justify-center">
        <AccountsTable
          accounts={accounts}
          page={page}
          pin={pin}
          accountUpdate={updateHandler}
        />
        <div className="text-center">
          <Pagination totalElems={accounts.length} page={page} />
        </div>
      </div>
    </div>
  );
}
