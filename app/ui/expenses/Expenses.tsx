'use client';

import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';

import { selectedPin } from '@/app/store/pin-context';
import { selectedYear } from '@/app/store/year-context';
import ExpensesTable from '@/app/ui/expenses/ExpensesTable';
import Pagination from '@/app/ui/ui/Pagination';
import { Account } from '@/app/lib/definitions';
import { fetchExpenses } from '@/app/lib/expenses';
import EmptyData from '../ui/EmptyData';

export default function Expenses({
  accounts,
  updated,
  updateHandler,
}: {
  accounts: Account[];
  updated: boolean;
  updateHandler: Dispatch<SetStateAction<boolean>>;
}) {
  const [expenses, setExpenses] = useState([]);
  const pin = useSelector(selectedPin);
  const year = useSelector(selectedYear);
  let selYear = 0;
  if (year !== undefined) {
    selYear = +year;
  }

  useEffect(() => {
    const getData = async () => {
      setExpenses(await fetchExpenses(pin, year));
    };

    getData();
  }, [pin, year, updated]);

  const searchParams = useSearchParams();
  const page: string = searchParams.get('page') || '1';

  if (!expenses || expenses.length === 0) {
    return <EmptyData />;
  }

  return (
    <div className="justify-center">
      <ExpensesTable
        expenses={expenses}
        page={page}
        accounts={accounts}
        expenseUpdate={updateHandler}
        pin={pin}
      />
      <div className="text-center">
        <Pagination totalElems={expenses.length} page={page} />
      </div>
    </div>
  );
}
