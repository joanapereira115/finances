'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

import { selectedPin } from '@/app/store/pin-context';
import { selectedYear } from '@/app/store/year-context';
import { getExpensesByCat } from '@/app/lib/data';
import ExpensesByCatg from '@/app/ui/reports/ExpensesByCatg';
import YearCatg from '@/app/ui/reports/YearCatg';
import TopCatg from '@/app/ui/reports/TopCatg';

export default function Page() {
  const [expensesByCatg, setExpensesByCatg] = useState([]);
  const pin = useSelector(selectedPin);
  const year = useSelector(selectedYear);
  let selYear = 0;
  if (year !== undefined) {
    selYear = +year;
  }
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      setExpensesByCatg(await getExpensesByCat(pin, year));
    };

    if (!pin) {
      router.replace('/');
    } else {
      getData();
    }
  }, [pin, router, year]);

  return (
    <div className="mt-4 flex" style={{ width: 'calc(100% - 3rem)' }}>
      <div
        className="mx-4 grow-0"
        style={{ width: 'calc(70% - 100px)' }}
      >
        <ExpensesByCatg expenses={expensesByCatg} />
      </div>
      <div className="mr-4 w-[30%]">
        <YearCatg expenses={expensesByCatg} />
        <TopCatg expenses={expensesByCatg} />
      </div>
    </div>
  );
}
