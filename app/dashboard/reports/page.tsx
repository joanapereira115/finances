'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

import { RevenueChartSkeleton } from '@/app/ui/skeletons';
import { selectedPin } from '@/app/store/pin-context';
import { selectedYear } from '@/app/store/year-context';
import { getExpensesByCat } from '@/app/lib/data';
import ExpensesByCatg from '@/app/ui/reports/ExpensesByCatg';

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
  }, [pin, router]);

  return (
    <div className="grid w-full">
      <Suspense fallback={<RevenueChartSkeleton />}>
        <ExpensesByCatg expenses={expensesByCatg} />
      </Suspense>
    </div>
  );
}
