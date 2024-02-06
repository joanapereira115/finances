'use client';

import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { selectedPin } from '@/app/store/pin-context';
import { selectedYear } from '@/app/store/year-context';
import ExpensesTable from '@/app/ui/expenses/ExpensesTable';
import Pagination from '@/app/ui/ui/Pagination';
import { Account } from '@/app/lib/definitions';
import { fetchExpenses } from '@/app/lib/expenses';

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
  const indexInit = (+page - 1) * 10;

  if (!expenses || expenses.length === 0) {
    return (
      <div className="mt-4 flex h-full flex-row items-center justify-center rounded-xl bg-white p-2 drop-shadow-md">
        <ExclamationCircleIcon className="pointer-events-none mr-2 h-[24px] w-[24px] text-red-500" />
        <p className="text-gray-400">Não foi encontrada informação.</p>
      </div>
    );
  }

  const expensesPage = [...expenses.slice(indexInit, indexInit + 10)];

  return (
    <div>
      <div className="mt-4 justify-center">
        <ExpensesTable expenses={expensesPage} accounts={accounts} expenseUpdate={updateHandler} pin={pin} />
        <div className="text-center">
          <Pagination totalElems={expenses.length} page={page} />
        </div>
      </div>
    </div>
  );
}
