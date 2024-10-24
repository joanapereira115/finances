'use client';

import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';

import ExpensesTable from '@/app/ui/expenses/ExpensesTable';
import Pagination from '@/app/ui/ui/Pagination';
import EmptyData from '../ui/EmptyData';

import { expensesList } from '@/app/store/expenses-context';

export default function Expenses() {
  const expenses = useSelector(expensesList);
  const searchParams = useSearchParams();
  const page: string = searchParams.get('page') || '1';

  if (!expenses || expenses.length === 0) {
    return <EmptyData />;
  }

  return (
    <div className="justify-center">
      <ExpensesTable expenses={expenses} page={page} />
      <div className="text-center">
        <Pagination totalElems={expenses.length} page={page} />
      </div>
    </div>
  );
}
