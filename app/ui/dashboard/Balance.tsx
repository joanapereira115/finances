'use client';

import { fetchBalance } from '@/app/lib/data';
import { CircularProgress } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedPin } from '@/app/store/pin-context';
import { selectedYear } from '@/app/store/year-context';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default async function Balance() {
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

  return (
    <div className="mr-2 mt-4 flex h-[38vh] grow flex-col justify-between rounded-xl bg-white p-4 drop-shadow-md">
      {balance ? (
        <div className="overflow-y-auto overflow-x-hidden text-center">
          <h2 className="m-1 text-lg font-bold">
            Percentagem rendimento gasto
          </h2>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <CircularProgress
                classNames={{
                  svg: 'w-32 h-32 drop-shadow-md',
                  indicator: 'stroke-lilac-100',
                  track: 'stroke-white/30',
                  value: 'text-xl font-semibold text-lilac-800',
                }}
                size="lg"
                value={balance.percentage}
                color="success"
                showValueLabel={true}
                aria-label="Percentagem rendimento gasto"
              />
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-2">
            <div className="p-2">
              <h2 className="text-lg font-bold">Total</h2>
              <p className="mb-1">{balance.total}€</p>
              <h2 className="text-lg font-bold">Diferença</h2>
              <p>{balance.difference}€</p>
            </div>
            <div className="p-2">
              <h2 className="text-lg font-bold">Rendimentos</h2>
              <p className="mb-1">{balance.income}€</p>
              <h2 className="text-lg font-bold">Despesas</h2>
              <p>{balance.expense}€</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-row items-center justify-center p-2">
          <ExclamationCircleIcon className="pointer-events-none mr-2 h-[24px] w-[24px] text-red-500" />
          <p className="text-gray-400">Não foi encontrada informação.</p>
        </div>
      )}
    </div>
  );
}
