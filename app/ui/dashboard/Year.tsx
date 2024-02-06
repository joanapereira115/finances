'use client';

import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectedYear } from '@/app/store/year-context';
import { update } from '@/app/store/year-context';

export default function Year({
  years,
}: {
  years: {
    availableYears: null | number[];
    currentYear: undefined | number;
  };
}) {
  const dispatch = useDispatch();
  const year = useSelector(selectedYear);

  useEffect(() => {
    if (year != years.currentYear && years.currentYear) {
      dispatch(update(years.currentYear));
    }
  }, [years]);

  return (
    <select
      className="block cursor-pointer rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
      value={year}
      onChange={(e) => dispatch(update(e.target.value as unknown as number))}
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
