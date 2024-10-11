'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedPin } from '@/app/store/pin-context';
import { Suspense } from 'react';
import { TransferTableSkeleton } from '@/app/ui/skeletons';
import { fetchAccounts } from '@/app/lib/accounts';
import { useRouter } from 'next/navigation';

import TransferForm from '@/app/ui/transfers/TransferForm';
import Transfers from '@/app/ui/transfers/Transfers';

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
  }, [router, pin]);

  return (
    <div className="mt-4 flex w-full">
      <div className="mx-4 w-[30%]">
        <TransferForm accounts={accounts} updateHandler={setUpdated} />
      </div>
      <div className="mr-4 w-[70%]">
        <Suspense fallback={<TransferTableSkeleton />}>
          <Transfers
            accounts={accounts}
            updated={updated}
            updateHandler={setUpdated}
          />
        </Suspense>
      </div>
    </div>
  );
}
