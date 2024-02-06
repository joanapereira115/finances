'use client';

import { Dispatch, SetStateAction } from 'react';
import { useSearchParams } from 'next/navigation';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { Account } from '@/app/lib/definitions';
import Pagination from '@/app/ui/ui/Pagination';
import AccountsTable from './AccountsTable';

export default async function Accounts({
  accounts,
  pin,
  updateHandler
}: {
  accounts: Account[];
  pin: string;
  updateHandler: Dispatch<SetStateAction<boolean>>;
}) {
  if (!accounts || accounts.length === 0) {
    return (
      <div className="mt-4 flex h-full flex-row items-center justify-center rounded-xl bg-white p-2 drop-shadow-md">
        <ExclamationCircleIcon className="pointer-events-none mr-2 h-[24px] w-[24px] text-red-500" />
        <p className="text-gray-400">Não foi encontrada informação.</p>
      </div>
    );
  }

  const searchParams = useSearchParams();
  const page: string = searchParams.get('page') || '1';
  const indexInit = (+page - 1) * 10;
  const accountsPage = [...accounts.slice(indexInit, indexInit + 10)];

  return (
    <div>
      <div className="mt-4 justify-center">
        <AccountsTable accounts={accountsPage} pin={pin} accountUpdate={updateHandler} />
        <div className="text-center">
          <Pagination totalElems={accounts.length} page={page} />
        </div>
      </div>
    </div>
  );
}
