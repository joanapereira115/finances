'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectedPin } from '@/app/store/pin-context';
import { selectedYear } from '@/app/store/year-context';
import HistoryTable from '@/app/ui/dashboard/HistoryTable';
import { fetchHistory } from '@/app/lib/data';

export default function Historic() {
  const [history, setHistory] = useState([]);
  const pin = useSelector(selectedPin);
  const year = useSelector(selectedYear);

  useEffect(() => {
    const getData = async () => {
      setHistory(await fetchHistory(pin, year));
    };

    getData();
  }, [pin, year]);

  return <HistoryTable history={history} />;
}
