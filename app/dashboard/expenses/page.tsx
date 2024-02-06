'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';

import { selectedPin } from '@/app/store/pin-context';
import ExpenseForm from '@/app/ui/expenses/ExpenseForm';
import Expenses from '@/app/ui/expenses/Expenses';
import { ExpensesTableSkeleton } from '@/app/ui/skeletons';
import { fetchAccounts } from '@/app/lib/accounts';

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
        <ExpenseForm accounts={accounts} updateHandler={setUpdated} />
      </div>
      <div>
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
