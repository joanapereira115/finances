import { fetchBalance } from '@/app/lib/data';
import { useSelector } from 'react-redux';
import EmptyData from '../ui/EmptyData';
import { selectedYear } from '@/app/store/year-context';
import { accountsList } from '@/app/store/accounts-context';
import { expensesList } from '@/app/store/expenses-context';
import { incomeList } from '@/app/store/income-context';
import { useEffect, useState } from 'react';
import { Balance } from '@/app/lib/definitions';

export default function Balances() {
  const year = useSelector(selectedYear);
  const accounts = useSelector(accountsList);
  const expenses = useSelector(expensesList);
  const income = useSelector(incomeList);

  const balance = fetchBalance(year, accounts, expenses, income);

  if (!balance) {
    return (
      <div className="ml-4 flex h-[35vh] flex-row justify-between gap-4">
        <EmptyData />
      </div>
    );
  }

  let widthPercentage =
    (balance as Balance).percentage < 100
      ? (balance as Balance).percentage
      : 100;

  return (
    <div className="ml-4 flex flex-col justify-between gap-4">
      <div
        className="row flex w-full gap-4"
        style={{ height: 'calc(20vh - 1rem)' }}
      >
        <div className="flex h-full w-[50%] flex-col justify-center rounded-xl bg-black-600 p-8 text-left text-white text-white drop-shadow-md drop-shadow-md">
          <h2 className="text-lg font-extralight">Total</h2>
          <h1 className="text-2xl font-bold ">{(balance as Balance).total}€</h1>
          <div className="mt-2 h-1 w-10 rounded bg-blue-600"></div>
        </div>

        <div className="flex h-full w-[50%] flex-col justify-center rounded-xl bg-black-600 p-8 text-left text-white text-white drop-shadow-md drop-shadow-md">
          <h2 className="text-lg font-extralight">Rendimento gasto</h2>
          <h1 className="text-2xl font-bold ">
            {(balance as Balance).percentage}%
          </h1>
          <div
            className="mt-2 h-1 rounded bg-lilac-100"
            style={{ width: `${widthPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="row flex h-[15vh] w-full gap-4 ">
        <div className="flex h-full w-[33.33%] flex-col justify-center rounded-xl bg-black-600 p-7 text-left text-white text-white drop-shadow-md drop-shadow-md">
          <h2 className="text-lg font-extralight">Diferença</h2>
          <h1 className="text-2xl font-bold">
            {(balance as Balance).difference}€
          </h1>
          <div className="mt-2 h-1 w-10 rounded bg-pink-500"></div>
        </div>
        <div className="flex h-full w-[33.33%] flex-col justify-center rounded-xl bg-black-600 p-7 text-left text-white text-white drop-shadow-md drop-shadow-md">
          <h2 className="text-lg font-extralight">Rendimentos</h2>
          <h1 className="text-2xl font-bold">{(balance as Balance).income}€</h1>
          <div className="mt-2 h-1 w-10 rounded bg-green-400"></div>
        </div>
        <div className="flex h-full w-[33.33%] flex-col justify-center rounded-xl bg-black-600 p-7 text-left text-white text-white drop-shadow-md drop-shadow-md">
          <h2 className="text-lg font-extralight">Despesas</h2>
          <h1 className="text-2xl font-bold">
            {(balance as Balance).expense}€
          </h1>
          <div className="mt-2 h-1 w-10 rounded bg-red-400"></div>
        </div>
      </div>
    </div>
  );
}
