'use client';

import { useSelector } from 'react-redux';
import { selectedPin } from '@/app/store/pin-context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getExpensesByCat } from '@/app/lib/data';
import ExpensesByCatg from '@/app/ui/reports/ExpensesByCatg';
import YearCatg from '@/app/ui/reports/YearCatg';
import TopCatg from '@/app/ui/reports/TopCatg';
import { expensesList } from '@/app/store/expenses-context';
import { selectedYear } from '@/app/store/year-context';
import { ExpensesByCat } from '@/app/lib/definitions';

export default function Page() {
  const pin = useSelector(selectedPin);
  const year = useSelector(selectedYear);
  const expenses = useSelector(expensesList);
  const [expensesByCatg, setExpensesByCatg] = useState<ExpensesByCat[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (!pin) {
      router.push('/');
    }
  }, [pin]);

  useEffect(() => {
    const getData = () => {
      const data = getExpensesByCat(expenses);
      setExpensesByCatg(data);
    };

    getData();
  }, [year, expenses]);

  return (
    <div className="mt-4 flex" style={{ width: 'calc(100% - 3rem)' }}>
      <div className="mx-4 grow-0" style={{ width: 'calc(70% - 100px)' }}>
        <ExpensesByCatg expenses={expensesByCatg} />
      </div>
      <div className="mr-4 w-[30%]">
        <YearCatg expenses={expensesByCatg} />
        <TopCatg expenses={expensesByCatg} />
      </div>
    </div>
  );
}
