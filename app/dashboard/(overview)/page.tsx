'use client';

import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectedPin } from '@/app/store/pin-context';

import {
  AccountsBalanceSkeleton,
  BalanceSkeleton,
  HistoricSkeleton,
  MonthlyBalanceSkeleton,
} from '@/app/ui/skeletons';
import Historic from '@/app/ui/dashboard/Historic';
import MonthlyBalance from '@/app/ui/dashboard/MonthlyBalance';
import Balance from '@/app/ui/dashboard/Balance';
import AccountsBalance from '@/app/ui/dashboard/AccountsBalance';

export default async function Page() {
  const router = useRouter();

  const pin = useSelector(selectedPin);

  useEffect(() => {
    if (!pin) {
      router.replace('/');
    }
  }, [router, pin]);

  return (
    <div className="grid w-full grid-cols-[60%_38%] gap-4">
      <div>
        <Suspense fallback={<HistoricSkeleton />}>
          <Historic />
        </Suspense>
        <Suspense fallback={<MonthlyBalanceSkeleton />}>
          <MonthlyBalance />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<BalanceSkeleton />}>
          <Balance />
        </Suspense>
        <Suspense fallback={<AccountsBalanceSkeleton />}>
          <AccountsBalance />
        </Suspense>
      </div>
    </div>
  );
}
