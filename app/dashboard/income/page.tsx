'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectedPin } from '@/app/store/pin-context';
import { useRouter } from 'next/navigation';

import IncomeForm from '@/app/ui/income/IncomeForm';
import Income from '@/app/ui/income/Income';
import { accountsList } from '@/app/store/accounts-context';

export default function Page() {
  const pin = useSelector(selectedPin);
  const accounts = useSelector(accountsList);
  const router = useRouter();

  useEffect(() => {
    if (!pin) {
      router.replace('/');
    }
  }, [router, pin]);

  return (
    <div className="mt-4 flex w-full">
      <div className="mx-4 w-[30%]">
        <IncomeForm accounts={accounts} />
      </div>
      <div className="mr-4 w-[70%]">
        <Income />
      </div>
    </div>
  );
}
