'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectedPin } from '@/app/store/pin-context';
import { useEffect } from 'react';
import Balances from '@/app/ui/dashboard/Balances';
import MonthlyBalance from '@/app/ui/dashboard/MonthlyBalance';
import AccountsBalance from '@/app/ui/dashboard/AccountsBalance';
import TopCatg from '@/app/ui/dashboard/TopCatg';

export default function Page() {
  const pin = useSelector(selectedPin);
  const router = useRouter();

  useEffect(() => {
    if (!pin) {
      router.push('/');
    }
  }, [pin]);

  return (
    <div className="h-full w-full">
      <div className="my-4 flex h-full w-full flex-row gap-4">
        <div className="w-[65%]">
          <Balances />
          <MonthlyBalance />
        </div>
        <div className="w-[35%]">
          <AccountsBalance />
          <TopCatg />
        </div>
      </div>
    </div>
  );
}
