'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ExpensesByCat } from '@/app/lib/definitions';

import EmptyData from '../ui/EmptyData';
import { useEffect, useState } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);
import { useSelector } from 'react-redux';

import { expensesList } from '@/app/store/expenses-context';
import { selectedYear } from '@/app/store/year-context';
import { fetchTopCatg } from '@/app/lib/data';

export default function TopCatg() {
  const [topCatg, setTopCatg] = useState([]);
  const year = useSelector(selectedYear);
  const expenses = useSelector(expensesList);

  useEffect(() => {
    const getData = () => {
      setTopCatg(fetchTopCatg(year, expenses));
    };

    getData();
  }, [year, expenses]);

  const data = {
    labels: topCatg.map((cat) => cat.cat),
    datasets: [
      {
        data: topCatg,
        backgroundColor: [
          '#C18CF9',
          '#7151A9',
          '#00a6fb',
          '#7fc8f8',
          '#BAEBFF',
          '#cfa8e7',
        ],
        borderColor: [
          '#C18CF9',
          '#7151A9',
          '#00a6fb',
          '#7fc8f8',
          '#BAEBFF',
          '#cfa8e7',
        ],
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw.value;
            return `${value}%`;
          },
        },
      },
      legend: {
        display: true,
        position: 'bottom' as 'bottom',
        labels: {
          font: {
            size: 16,
          },
          padding: 20,
          boxWidth: 20,
        },
      },
      title: {
        display: false,
      },
      subtitle: {
        display: false,
      },
    },
  };

  if (topCatg && topCatg.every((item) => item === 0)) {
    return (
      <div className="mr-4 mt-4 flex h-[48vh]">
        <EmptyData />
      </div>
    );
  }

  return (
    <div className="mr-4 mt-4 flex h-[48vh] flex-col justify-between rounded-xl bg-black-600 p-4 text-white drop-shadow-md">
      <div className="overflow-x-hidden overflow-y-hidden text-center">
        <h2 className="m-2 text-lg font-bold">Top 5 despesas por categoria</h2>
        <div className="flex items-center justify-center">
          <Doughnut
            className="translate-y-[-3rem] scale-[.70]"
            data={data}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}
