'use client';

import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectedPin } from '@/app/store/pin-context';

import {
  AccountsBalanceSkeleton,
  BalancesSkeleton,
  MonthlyBalanceSkeleton,
} from '@/app/ui/skeletons';
import MonthlyBalance from '@/app/ui/dashboard/MonthlyBalance';
import Balance from '@/app/ui/dashboard/Balance';
import AccountsBalance from '@/app/ui/dashboard/AccountsBalance';
import Balances from '@/app/ui/dashboard/Balances';

export default async function Page() {
  const router = useRouter();

  const pin = useSelector(selectedPin);

  useEffect(() => {
    if (!pin) {
      router.replace('/');
    }
  }, [router, pin]);

  return (
    <div className="mt-4 h-full w-full">
      <div>
        <Suspense fallback={<BalancesSkeleton />}>
          <Balances />
        </Suspense>
      </div>
      <div className="mb-4 mt-4 flex h-full w-full flex-row gap-4">
        <div className="w-[60%]">
          <Suspense fallback={<MonthlyBalanceSkeleton />}>
            <MonthlyBalance />
          </Suspense>
        </div>
        <div className="w-[40%]">
          <Suspense fallback={<AccountsBalanceSkeleton />}>
            <AccountsBalance />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
