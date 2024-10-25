'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { store } from '@/app/store/store';
import { selectedYear } from '@/app/store/year-context';
import { update } from '@/app/store/year-context';
import { getExpenses } from '@/app/store/expenses-context';
import { getIncome } from '@/app/store/income-context';
import { getAccounts } from '@/app/store/accounts-context';
import { getTransfers } from '@/app/store/transfers-context';
import { getIRS } from '@/app/store/irs-context';

export default function Year({
  years,
}: {
  years: {
    availableYears: null | number[];
    currentYear: undefined | number;
  };
}) {
  const year = useSelector(selectedYear);

  useEffect(() => {
    if (!year && years.availableYears.includes(years.currentYear)) {
      store.dispatch(update(years.currentYear));
    }
  }, [year, years]);

  useEffect(() => {
    if (year) {
      store.dispatch(getExpenses());
      store.dispatch(getIncome());
      store.dispatch(getAccounts());
      store.dispatch(getTransfers());
      store.dispatch(getIRS());
    }
  }, [year]);

  return (
    <select
      className="block cursor-pointer rounded-md border bg-black-600 text-sm text-white outline-2 placeholder:text-white"
      value={year}
      onChange={(e) => {
        store.dispatch(update(e.target.value as unknown as number));
      }}
    >
      {years.availableYears &&
        years.availableYears?.map((y) => (
          <option key={y} value={y as number}>
            {y}
          </option>
        ))}
    </select>
  );
}
