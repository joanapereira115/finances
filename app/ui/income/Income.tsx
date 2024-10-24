'use client';

import { useSelector } from 'react-redux';

import Pagination from '@/app/ui/ui/Pagination';
import { useSearchParams } from 'next/navigation';
import { Account } from '@/app/lib/definitions';
import IncomeTable from '@/app/ui/income/IncomeTable';
import EmptyData from '../ui/EmptyData';
import { incomeList } from '@/app/store/income-context';

export default function Income() {
  const income = useSelector(incomeList);
  const searchParams = useSearchParams();
  const page: string = searchParams.get('page') || '1';

  if (!income || income.length === 0) {
    return <EmptyData />;
  }

  return (
    <div className="justify-center">
      <IncomeTable income={income} page={page} />
      <div className="text-center">
        <Pagination totalElems={income.length} page={page} />
      </div>
    </div>
  );
}
