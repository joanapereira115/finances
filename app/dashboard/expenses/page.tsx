'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { selectedPin } from '@/app/store/pin-context';
import { accountsList } from '@/app/store/accounts-context';
import ExpenseForm from '@/app/ui/expenses/ExpenseForm';
import Expenses from '@/app/ui/expenses/Expenses';
import { useEffect } from 'react';

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
        <ExpenseForm accounts={accounts} />
      </div>
      <div className="mr-4 w-[70%]">
        <Expenses />
      </div>
    </div>
  );
}
