'use client';

import { fetchBalance } from '@/app/lib/data';
import { CircularProgress } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedPin } from '@/app/store/pin-context';
import { selectedYear } from '@/app/store/year-context';
import EmptyData from '../ui/EmptyData';

export default async function Balances() {
  const [balance, setBalance] = useState(null);
  const pin = useSelector(selectedPin);
  const year = useSelector(selectedYear);
  let selYear = 0;
  if (year !== undefined) {
    selYear = +year;
  }

  useEffect(() => {
    const getData = async () => {
      setBalance(await fetchBalance(pin, year));
    };

    getData();
  }, [pin, year]);

  if (!balance) {
    return (
      <div
        className="mx-4 flex h-[20vh] flex-row justify-between gap-4"
        style={{ width: 'calc(100% - 2rem)' }}
      >
        <EmptyData />
      </div>
    );
  }

  return (
    <div className="mx-4 flex h-[20vh] flex-row justify-between gap-4">
      <div className="bg-black-600 h-full w-[20%] overflow-y-auto overflow-x-hidden rounded-xl p-4 text-center text-white drop-shadow-md">
        <h2 className="text-lg">Rendimento gasto</h2>
        <div
          className="flex items-center justify-center"
          style={{ height: 'calc(100% - 2rem)' }}
        >
          <div className="text-center">
          
           <CircularProgress
              classNames={{
                svg: 'w-24 h-24 drop-shadow-md',
                indicator: 'stroke-lilac-100',
                track: 'stroke-white/30',
                value: 'text-xl font-semibold text-lilac-800 text-center',
              }}
              size="lg"
              value={balance.percentage}
              color="success"
              showValueLabel={true}
              aria-label="Percentagem rendimento gasto"
            />
     </div>
        </div>
      </div>
      <div className="bg-black-600 flex w-[20%] flex-col justify-center gap-2 rounded-xl p-8 text-left text-white text-white drop-shadow-md drop-shadow-md">
        <h2 className="text-lg ">Total</h2>
        <h1 className="text-2xl font-bold text-blue-600">{balance.total}€</h1>
      </div>
      <div className="bg-black-600 flex w-[20%] flex-col justify-center gap-2 rounded-xl p-8 text-left text-white text-white drop-shadow-md drop-shadow-md">
        <h2 className="text-lg ">Diferença</h2>
        <h1 className="text-2xl font-bold text-pink-500">
          {balance.difference}€
        </h1>
      </div>
      <div className="bg-black-600 flex w-[20%] flex-col justify-center gap-2 rounded-xl p-8 text-left text-white text-white drop-shadow-md drop-shadow-md">
        <h2 className="text-lg ">Rendimentos</h2>
        <h1 className="text-2xl font-bold text-green-400">{balance.income}€</h1>
      </div>
      <div className="bg-black-600 flex w-[20%] flex-col justify-center gap-2 rounded-xl p-8 text-left text-white text-white drop-shadow-md drop-shadow-md">
        <h2 className="text-lg ">Despesas</h2>
        <h1 className="text-2xl font-bold text-red-400">{balance.expense}€</h1>
      </div>
    </div>
  );
}
