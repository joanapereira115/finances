'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { Button } from '@/app/ui/button';
import { selectedYear } from '@/app/store/year-context';

import { CurrencyEuroIcon, WalletIcon } from '@heroicons/react/24/outline';
import { IRSDef } from '@/app/lib/definitions';
import { youngIRS, types } from '@/app/lib/irsData';
import { store } from '@/app/store/store';
import { updateIRS } from '@/app/store/irs-context';

export default function IRSForm({ irsData }: { irsData: IRSDef }) {
  const formRef = useRef(null);
  const year = useSelector(selectedYear);
  const [type, setType] = useState('');
  const [gross, setGross] = useState<string | number>('');
  const [retention, setRetention] = useState<string | number>('');
  const [young, setYoung] = useState<string | number>('');
  const [deduction, setDeduction] = useState<string | number>('');

  useEffect(() => {
    if (irsData) {
      setType(irsData.type);
      setGross(irsData.grossIncome);
      setRetention(irsData.withHolding);
      setYoung(irsData.youngIrs);
      setDeduction(irsData.deductions);
    }
  }, [irsData]);

  let disable = false;
  if (!type || !gross || !retention) {
    disable = true;
  }

  const resetState = () => {
    setType('');
    setGross('');
    setRetention('');
    setYoung('');
    setDeduction('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const irsData: IRSDef = {
      year: +year,
      type: (formData.get('type') as string) || '',
      grossIncome: (formData.get('gross') as unknown as number) || 0,
      withHolding: (formData.get('retention') as unknown as number) || 0,
      youngIrs: (formData.get('young') as unknown as number) || '',
      deductions: (formData.get('deduction') as unknown as number) || 0,
      socialSecurity: 0,
      countyAid: 0,
    };
    store.dispatch(updateIRS(irsData));
  };

  const onReset = (event) => {
    event.preventDefault();
    resetState();
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="flex grow flex-col justify-between rounded-xl bg-black-600 p-4 text-white drop-shadow-md">
        <h2 className="text-lg font-bold">Simulador IRS</h2>

        <div className="relative mt-3 rounded-md">
          <label className="text-sm text-gray-500" htmlFor="type">
            Tipo de tributação
          </label>
          <select
            id="type"
            name="type"
            className="peer mt-1 w-full cursor-pointer rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            required
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option value="" disabled>
              Tipo de tributação
            </option>
            {types?.map((type) => (
              <option key={type.id} value={type.id}>
                {type.description}
              </option>
            ))}
          </select>
          <WalletIcon className="pointer-events-none absolute left-3 top-[2.3rem] h-[18px] w-[18px] text-gray-500 peer-focus:text-white" />
        </div>

        <div className="relative mt-2 rounded-md">
          <label className="text-sm text-gray-500" htmlFor="gross">
            Rendimento Bruto Anual
          </label>
          <input
            id="gross"
            name="gross"
            type="number"
            min={0.0}
            step="0.01"
            value={gross}
            placeholder="Rendimento Bruto Anual"
            className="peer mt-1 block w-full rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            onChange={(e) => setGross(+e.target.value)}
          />
          <CurrencyEuroIcon className="pointer-events-none absolute left-3 top-[2.3rem] h-[18px] w-[18px] text-gray-500 peer-focus:text-white" />
        </div>

        <div className="relative mt-2 rounded-md">
          <label className="text-sm text-gray-500" htmlFor="retention">
            Retenção na Fonte
          </label>
          <input
            id="retention"
            name="retention"
            type="number"
            min={0.0}
            step="0.01"
            placeholder="Retenção na Fonte"
            className="peer mt-1 block w-full rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            onChange={(e) => setRetention(+e.target.value)}
            value={retention}
          />
          <CurrencyEuroIcon className="pointer-events-none absolute left-3 top-[2.3rem] h-[18px] w-[18px] text-gray-500 peer-focus:text-white" />
        </div>

        <div className="relative mt-2 rounded-md">
          <label className="text-sm text-gray-500" htmlFor="young">
            IRS Jovem
          </label>
          <select
            id="young"
            name="young"
            className="peer mt-1 block w-full cursor-pointer rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            required
            onChange={(e) => setYoung(e.target.value)}
            value={young}
          >
            <option value="">Sem IRS Jovem</option>
            {youngIRS[year]?.map((youngVal) => (
              <option key={youngVal.id} value={youngVal.id}>
                {youngVal.description}
              </option>
            ))}
          </select>
          <WalletIcon className="pointer-events-none absolute left-3 top-[2.3rem] h-[18px] w-[18px] text-gray-500 peer-focus:text-white" />
        </div>

        <div className="relative mt-3 rounded-md">
          <label className="text-sm text-gray-500" htmlFor="deduction">
            Deduções
          </label>
          <input
            id="deduction"
            name="deduction"
            type="number"
            min={0.0}
            step="0.01"
            placeholder="Deduções"
            className="peer mt-1 block w-full rounded-md border border-white bg-black-600 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            value={deduction}
            onChange={(e) => setDeduction(+e.target.value)}
          />
          <CurrencyEuroIcon className="pointer-events-none absolute left-3 top-[2.3rem] h-[18px] w-[18px] text-gray-500 peer-focus:text-white" />
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
            Simular
          </Button>
        </div>
      </div>
    </form>
  );
}
