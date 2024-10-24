'use client';

import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  CurrencyEuroIcon,
  TagIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';

import { accountCategories } from '@/app/lib/categories';
import { selectedPin } from '@/app/store/pin-context';
import { Button } from '@/app/ui/button';
import { store } from '@/app/store/store';
import { addAccount } from '@/app/store/accounts-context';

export default function AccountForm() {
  const pin = useSelector(selectedPin);
  const formRef = useRef(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  let disable = false;

  if (!name || !type) {
    disable = true;
  }

  const resetState = () => {
    setName('');
    setType('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    store.dispatch(addAccount(formData));
    resetState();
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
        <h2 className="text-lg font-bold">Nova Conta</h2>

        <div className="relative mt-3 rounded-md">
          <div className="relative">
            <input
              id="name"
              name="name"
              type="string"
              placeholder="Conta"
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
              id="balance"
              name="balance"
              type="number"
              min={0.0}
              step="0.01"
              placeholder="Valor"
              className="peer block w-full rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyEuroIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-white" />
          </div>
        </div>

        <div className="relative mt-3 rounded-md">
          <select
            id="type"
            name="type"
            className="peer block w-full cursor-pointer rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            required
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              Tipo
            </option>
            {accountCategories.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.description}
              </option>
            ))}
          </select>
          <WalletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-white" />
        </div>

        <div className="justify-left mt-3 flex w-full flex-row items-center">
          <label htmlFor="active" className="mr-3 block text-sm font-medium">
            Ativa?
          </label>
          <div className="rounded-md">
            <input
              id="active"
              name="active"
              type="checkbox"
              className="peer block rounded-md border border-white bg-black-600 py-2 text-lg outline-2"
              defaultChecked
            />
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
            Adicionar Conta
          </Button>
        </div>
      </div>
    </form>
  );
}
