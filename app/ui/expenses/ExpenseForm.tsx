import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import {
  CurrencyEuroIcon,
  TagIcon,
  CalendarDaysIcon,
  WalletIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

import { expenseCategories } from '@/app/lib/categories';
import { Account } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { store } from '@/app/store/store';
import { addExpense } from '@/app/store/expenses-context';
import { getAccounts } from '@/app/store/accounts-context';

export default function ExpenseForm({ accounts }: { accounts: Account[] }) {
  const formRef = useRef(null);
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [date, setDate] = useState('');
  let disable = false;

  if (!name || !account || !date) {
    disable = true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    store.dispatch(addExpense(formData));
    store.dispatch(getAccounts());
    event.target.reset();
  };

  const onReset = (event) => {
    event.preventDefault();
    setName('');
    setAccount('');
    setDate('');
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="flex grow flex-col justify-between rounded-xl bg-black-600 p-4 text-white drop-shadow-md">
        <h2 className="text-lg font-bold">Nova Despesa</h2>

        <div className="relative mt-3 rounded-md">
          <div className="relative">
            <input
              id="name"
              name="name"
              type="string"
              placeholder="Despesa"
              className="peer block w-full rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-white" />
          </div>
        </div>

        <div className="relative mt-3 rounded-md">
          <div className="relative">
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={new Date().toDateString()}
              onChange={(e) => setDate(e.target.value)}
              className="peer block w-full rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-white" />
          </div>
        </div>

        <div className="relative mt-3 rounded-md">
          <select
            id="account"
            name="account"
            className="peer block w-full cursor-pointer rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            onChange={(e) => setAccount(e.target.value)}
            required
          >
            <option value="" disabled>
              Conta
            </option>
            {accounts.map(
              (acc) =>
                acc.active && (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ),
            )}
          </select>
          <WalletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>

        <div className="relative mt-3 rounded-md">
          <select
            id="category"
            name="category"
            className="peer block w-full cursor-pointer rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
          >
            <option value="" disabled>
              Categoria
            </option>
            {expenseCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <ListBulletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>

        <div className="relative mt-3 rounded-md">
          <div className="relative">
            <input
              id="value"
              name="value"
              type="number"
              min={0.0}
              step="0.01"
              placeholder="Valor"
              className="peer block w-full rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyEuroIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-white" />
          </div>
        </div>

        <div className="justify-left mt-3 flex w-full flex-row items-center">
          <label htmlFor="nif" className="mr-3 block text-sm font-medium">
            Fatura?
          </label>
          <div className="rounded-md">
            <input
              id="nif"
              name="nif"
              type="checkbox"
              className="peer block rounded-md border border-white bg-black-600 py-2 text-lg outline-2"
            />
          </div>
        </div>

        <div className="relative mt-3 rounded-md">
          <input
            id="iva"
            name="iva"
            type="number"
            min={0.0}
            step="0.01"
            placeholder="Benefício IRS"
            className="peer block w-full rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2"
          />
          <CurrencyEuroIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-white" />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button
            className="bg-blue-600 hover:scale-105"
            type="button"
            onClick={onReset}
          >
            Cancelar
          </Button>
          <Button
            className={clsx(
              disable
                ? 'bg-lilac-100 opacity-40'
                : 'bg-lilac-100 hover:scale-105',
            )}
            disabled={disable}
            type="submit"
          >
            Adicionar Despesa
          </Button>
        </div>
      </div>
    </form>
  );
}
