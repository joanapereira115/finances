'use client';

import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { selectedPin } from '@/app/store/pin-context';
import Pagination from '@/app/ui/ui/Pagination';
import { useSearchParams } from 'next/navigation';
import { selectedYear } from '@/app/store/year-context';
import { Income, Account } from '@/app/lib/definitions';
import IncomeTable from '@/app/ui/income/IncomeTable';
import { fetchIncome } from '@/app/lib/income';

export default function Income({
  accounts,
  updated,
  updateHandler,
}: {
  accounts: Account[];
  updated: boolean;
  updateHandler: Dispatch<SetStateAction<boolean>>;
}) {
  const [income, setIncome] = useState([]);
  const pin = useSelector(selectedPin);
  const year = useSelector(selectedYear);
  let selYear = 0;
  if (year !== undefined) {
    selYear = +year;
  }

  useEffect(() => {
    const getData = async () => {
      setIncome(await fetchIncome(pin, year));
    };

    getData();
  }, [pin, year, updated]);

  const searchParams = useSearchParams();
  const page: string = searchParams.get('page') || '1';
  const indexInit = (+page - 1) * 10;

  if (!income || income.length === 0) {
    return (
      <div className="mt-4 flex h-full flex-row items-center justify-center rounded-xl bg-white p-2 drop-shadow-md">
        <ExclamationCircleIcon className="pointer-events-none mr-2 h-[24px] w-[24px] text-red-500" />
        <p className="text-gray-400">Não foi encontrada informação.</p>
      </div>
    );
  }

  const incomePage = [...income.slice(indexInit, indexInit + 10)];

  return (
    <div className="mt-4 justify-center">
      <IncomeTable income={incomePage} accounts={accounts} pin={pin} incomeUpdate={updateHandler} />
      <div className="text-center">
        <Pagination totalElems={income.length} page={page} />
      </div>
    </div>
  );
}
