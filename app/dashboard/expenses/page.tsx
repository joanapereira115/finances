'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

import { selectedPin } from '@/app/store/pin-context';
import ExpenseForm from '@/app/ui/expenses/ExpenseForm';
import Expenses from '@/app/ui/expenses/Expenses';
import { fetchAccounts } from '@/app/lib/accounts';
import { ExpensesTableSkeleton } from '@/app/ui/skeletons';

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
        <ExpenseForm accounts={accounts} updateHandler={setUpdated} />
      </div>
      <div className="mr-4 w-[70%]">
        <Suspense fallback={<ExpensesTableSkeleton />}>
          <Expenses
            accounts={accounts}
            updated={updated}
            updateHandler={setUpdated}
          />
        </Suspense>
      </div>
    </div>
  );
}
