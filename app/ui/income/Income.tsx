'use client';

import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';

import { selectedPin } from '@/app/store/pin-context';
import Pagination from '@/app/ui/ui/Pagination';
import { useSearchParams } from 'next/navigation';
import { selectedYear } from '@/app/store/year-context';
import { Account } from '@/app/lib/definitions';
import IncomeTable from '@/app/ui/income/IncomeTable';
import { fetchIncome } from '@/app/lib/income';
import EmptyData from '../ui/EmptyData';

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

  if (!income || income.length === 0) {
    return <EmptyData />;
  }

  return (
    <div className="justify-center">
      <IncomeTable
        income={income}
        page={page}
        accounts={accounts}
        pin={pin}
        incomeUpdate={updateHandler}
      />
      <div className="text-center">
        <Pagination totalElems={income.length} page={page} />
      </div>
    </div>
  );
}
