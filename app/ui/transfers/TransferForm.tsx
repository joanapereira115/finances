import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { Account } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { newTransferHandler } from '@/app/lib/actions';
import { selectedPin } from '@/app/store/pin-context';

import {
  CurrencyEuroIcon,
  TagIcon,
  CalendarDaysIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import { store } from '@/app/store/store';
import { addTransfer } from '@/app/store/transfers-context';
import { getAccounts } from '@/app/store/accounts-context';

export default function TransferForm({ accounts }: { accounts: Account[] }) {
  const pin = useSelector(selectedPin);
  const formRef = useRef(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [accountFrom, setAccountFrom] = useState('');
  const [accountTo, setAccountTo] = useState('');
  let disable = false;

  if (!name || !date || !accountFrom || !accountTo) {
    disable = true;
  }

  const resetState = () => {
    setName('');
    setDate('');
    setAccountFrom('');
    setAccountTo('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    store.dispatch(addTransfer(formData));
    store.dispatch(getAccounts());
    event.target.reset();
  };

  const onReset = (event) => {
    event.preventDefault();
    resetState();
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="flex grow flex-col justify-between rounded-xl bg-black-600 p-4 text-white drop-shadow-md">
        <h2 className="text-lg font-bold">Nova Transferência</h2>

        <div className="relative mt-3 rounded-md">
          <div className="relative">
            <input
              id="name"
              name="name"
              type="string"
              placeholder="Transferência"
              className="peer block w-full rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
              onChange={(e) => setName(e.target.value)}
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
            id="accountFrom"
            name="accountFrom"
            className="peer block w-full cursor-pointer rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            required
            onChange={(e) => setAccountFrom(e.target.value)}
          >
            <option value="" disabled>
              Da conta
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
            id="accountTo"
            name="accountTo"
            className="peer block w-full cursor-pointer rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            required
            onChange={(e) => setAccountTo(e.target.value)}
          >
            <option value="" disabled>
              Para a conta
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
            Adicionar Transferência
          </Button>
        </div>
      </div>
    </form>
  );
}
