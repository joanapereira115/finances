'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectedPin } from '@/app/store/pin-context';
import { selectedYear } from '@/app/store/year-context';
import { fetchMonthlyBalance } from '@/app/lib/data';

import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import EmptyData from '../ui/EmptyData';
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

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
        borderColor: '#4ade80',
      },
      {
        label: 'Despesas',
        data: monthlyBalance?.expenses,
        fill: false,
        borderColor: '#f87171',
      },
      {
        label: 'Diferença',
        data: monthlyBalance?.difference,
        fill: false,
        borderColor: '#21afd5',
      },
    ],
  };

  if (!monthlyBalance) {
    return (
      <div className="bg-black-600 ml-4 flex h-[62vh] items-center rounded-xl p-4 drop-shadow-md">
        <EmptyData />
      </div>
    );
  }

  return (
    <div className="bg-black-600 ml-4 flex h-[62vh] items-center rounded-xl p-4 drop-shadow-md">
      <Line data={data} options={options} />
    </div>
  );
}
