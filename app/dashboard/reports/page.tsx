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
import YearCatg from '@/app/ui/reports/YearCatg';

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
    <div className="grid w-full grid-cols-[54%_42%] gap-4">
      <Suspense>
        <div>
          <ExpensesByCatg expenses={expensesByCatg} />
        </div>
        <div>
          <YearCatg expenses={expensesByCatg} />
        </div>
      </Suspense>
    </div>
  );
}
