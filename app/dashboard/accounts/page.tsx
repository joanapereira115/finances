'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

import { AccountsTableSkeleton } from '@/app/ui/skeletons';
import { selectedPin } from '@/app/store/pin-context';
import { fetchAccounts } from '@/app/lib/accounts';
import AccountForm from '@/app/ui/accounts/AccountForm';
import Accounts from '@/app/ui/accounts/Accounts';

export default function Page() {
  const [accounts, setAccounts] = useState([]);
  const [updated, setUpdated] = useState(false);
  const pin = useSelector(selectedPin);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      setAccounts(await fetchAccounts(pin));
    };

    if (!pin) {
      router.replace('/');
    } else {
      getData();
    }
  }, [pin, router, updated]);

  return (
    <div className="mt-4 flex w-full">
      <div className="mx-4 w-[30%]">
        <AccountForm updateHandler={setUpdated} />
      </div>
      <div className="mr-4 w-[70%]">
        <Suspense fallback={<AccountsTableSkeleton />}>
          <Accounts accounts={accounts} pin={pin} updateHandler={setUpdated} />
        </Suspense>
      </div>
    </div>
  );
}
