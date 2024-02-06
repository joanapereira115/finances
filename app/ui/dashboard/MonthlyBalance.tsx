'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { selectedPin } from '@/app/store/pin-context';
import { selectedYear } from '@/app/store/year-context';
import { fetchMonthlyBalance } from '@/app/lib/data';

import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function MonthlyBalance() {
  const [monthlyBalance, setMonthlyBalance] = useState(null);
  const pin = useSelector(selectedPin);
  const year = useSelector(selectedYear);

  useEffect(() => {
    const getData = async () => {
      setMonthlyBalance(await fetchMonthlyBalance(pin, year));
    };

    getData();
  }, [pin, year]);

  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    datasets: [
      {
        label: 'Rendimentos',
        data: monthlyBalance?.income,
        fill: false,
        borderColor: 'rgb(134 239 172)',
      },
      {
        label: 'Despesas',
        data: monthlyBalance?.expenses,
        fill: false,
        borderColor: 'rgb(252 165 165)',
      },
      {
        label: 'Diferença',
        data: monthlyBalance?.difference,
        fill: false,
        borderColor: 'rgb(147 197 253)',
      },
    ],
  };

  return (
    <div className="ml-4 mt-4 flex h-[52vh] grow flex-col justify-between rounded-xl bg-white p-4 drop-shadow-md">
      {monthlyBalance ? (
        <Line data={data} />
      ) : (
        <div className="flex h-full flex-row items-center justify-center p-2">
          <ExclamationCircleIcon className="pointer-events-none mr-2 h-[24px] w-[24px] text-red-500" />
          <p className="text-gray-400">Não foi encontrada informação.</p>
        </div>
      )}
    </div>
  );
}
