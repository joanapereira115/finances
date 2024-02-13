'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedPin } from '@/app/store/pin-context';
import { Suspense } from 'react';
import { IncomeTableSkeleton } from '@/app/ui/skeletons';
import { fetchAccounts } from '@/app/lib/accounts';
import { useRouter } from 'next/navigation';

import Income from '@/app/ui/income/Income';
import TransferForm from '@/app/ui/transfers/TransferForm';

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
    <div className="grid w-full grid-cols-[32%_65.5%] gap-4">
      <div>
        <TransferForm accounts={accounts} updateHandler={setUpdated} />
      </div>
      <div>
        <Suspense fallback={<IncomeTableSkeleton />}>
          <Income
            accounts={accounts}
            updated={updated}
            updateHandler={setUpdated}
          />
        </Suspense>
      </div>
    </div>
  );
}
