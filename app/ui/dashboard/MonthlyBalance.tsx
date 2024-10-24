'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedYear } from '@/app/store/year-context';
import { expensesList } from '@/app/store/expenses-context';
import { incomeList } from '@/app/store/income-context';
import { selectedPin } from '@/app/store/pin-context';
import { fetchMonthlyAccumulated, fetchMonthlyBalance } from '@/app/lib/data';

import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import EmptyData from '../ui/EmptyData';
import clsx from 'clsx';
Chart.register(...registerables);

export default function MonthlyBalance() {
  const [monthlyBalance, setMonthlyBalance] = useState(null); //basic
  const [monthlyAccumulated, setMonthlyAccumulated] = useState(null); //accumulated
  const [selectedGraph, setSelectedGraph] = useState('basic');
  const year = useSelector(selectedYear);
  const expenses = useSelector(expensesList);
  const income = useSelector(incomeList);

  useEffect(() => {
    const getData = () => {
      setMonthlyBalance(fetchMonthlyBalance(year, income, expenses));
      setMonthlyAccumulated(fetchMonthlyAccumulated(year, income, expenses));
    };

    getData();
  }, [year, expenses, income]);

  const toggleCharts = (checked: boolean) => {
    if (!checked) {
      setSelectedGraph('basic');
    } else {
      setSelectedGraph('accumulated');
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as 'bottom' } },
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

  const accumulatedData = {
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
        data: monthlyAccumulated?.income,
        fill: false,
        borderColor: '#4ade80',
      },
      {
        label: 'Despesas',
        data: monthlyAccumulated?.expenses,
        fill: false,
        borderColor: '#f87171',
      },
      {
        label: 'Diferença',
        data: monthlyAccumulated?.difference,
        fill: false,
        borderColor: '#21afd5',
      },
    ],
  };

  if (!monthlyBalance) {
    return (
      <div className="ml-4 mt-4 flex h-[48vh]">
        <EmptyData />
      </div>
    );
  }

  return (
    <div className="ml-4 mt-4 flex h-[48vh] flex-col items-center rounded-xl bg-black-600 p-4 drop-shadow-md">
      <div className="row flex items-center gap-4 text-sm text-gray-500">
        <p>Valores mensais</p>

        <input
          type="checkbox"
          id="toggle"
          className="sr-only"
          onChange={(e) => {
            toggleCharts(e.target.checked);
          }}
        />

        <label htmlFor="toggle" className="cursor-pointer">
          <div className="flex h-6 w-10 items-center rounded-full bg-gray-500 p-1 transition-colors">
            <div
              className={clsx(
                'h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300',
                selectedGraph === 'basic' ? '' : 'translate-x-4',
              )}
            ></div>
          </div>
        </label>

        <p>Valores acumulados</p>
      </div>
      {selectedGraph === 'basic' && (
        <Line data={data} options={options} className="mb-4 p-4" />
      )}
      {selectedGraph === 'accumulated' && (
        <Line data={accumulatedData} options={options} className="mb-4 p-4" />
      )}
    </div>
  );
}
