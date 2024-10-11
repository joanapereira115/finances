'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CreditCardIcon,
  BanknotesIcon,
  ShoppingCartIcon,
  ArrowTrendingUpIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

import { selectedPin } from '@/app/store/pin-context';
import { selectedYear } from '@/app/store/year-context';
import { fetchAccounts } from '@/app/lib/accounts';
import { Account } from '@/app/lib/definitions';

export default async function AccountsBalance() {
  const [accounts, setAccounts] = useState([]);
  const pin = useSelector(selectedPin);
  const year = useSelector(selectedYear);

  useEffect(() => {
    const getData = async () => {
      let allAccounts = await fetchAccounts(pin);
      setAccounts(
        allAccounts.filter((account: Account) => account.active === true),
      );
    };

    getData();
  }, [pin, year]);

  if (!accounts || accounts.length === 0) {
    return (
      <div className="bg-black-600 mr-4 flex h-[62vh] flex-row items-center justify-center rounded-xl p-4 text-white drop-shadow-md">
        <ExclamationCircleIcon className="pointer-events-none mr-2 h-[24px] w-[24px] text-red-500" />
        <p className="text-gray-400">Não foi encontrada informação.</p>
      </div>
    );
  }

  return (
    <div className="bg-black-600 mr-4 flex h-[62vh] flex-col justify-between rounded-xl p-4 text-white drop-shadow-md">
      <div className="overflow-y-auto overflow-x-hidden">
        {accounts.map(
          (account, i) =>
            account.active && (
              <div
                key={account.id}
                className="grid w-full grid-cols-[10%_90%] gap-4"
              >
                <div className="flex items-center">
                  {((account.type === 'CARD' && i === 0) ||
                    (account.type === 'CARD' &&
                      i !== 0 &&
                      account.type !== accounts[+i - 1].type)) && (
                    <CreditCardIcon className="pointer-events-none mx-2 h-9 w-9 text-blue-600" />
                  )}
                  {((account.type === 'MONE' && i === 0) ||
                    (account.type === 'MONE' &&
                      i !== 0 &&
                      account.type !== accounts[+i - 1].type)) && (
                    <BanknotesIcon className="pointer-events-none mx-2 h-9 w-9 text-green-400" />
                  )}
                  {((account.type === 'MEAL' && i === 0) ||
                    (account.type === 'MEAL' &&
                      i !== 0 &&
                      account.type !== accounts[+i - 1].type)) && (
                    <ShoppingCartIcon className="pointer-events-none mx-2 h-9 w-9 text-lilac-100" />
                  )}
                  {((account.type === 'SAVI' && i === 0) ||
                    (account.type === 'SAVI' &&
                      i !== 0 &&
                      account.type !== accounts[+i - 1].type)) && (
                    <LockClosedIcon className="pointer-events-none mx-2 h-9 w-9 text-yellow-300" />
                  )}
                  {((account.type === 'INVE' && i === 0) ||
                    (account.type === 'INVE' &&
                      i !== 0 &&
                      account.type !== accounts[+i - 1].type)) && (
                    <ArrowTrendingUpIcon className="pointer-events-none mx-2 h-9 w-9 text-red-400" />
                  )}
                  {((account.type === 'CEAF' && i === 0) ||
                    (account.type === 'CEAF' &&
                      i !== 0 &&
                      account.type !== accounts[+i - 1].type)) && (
                    <BuildingLibraryIcon className="pointer-events-none mx-2 h-9 w-9 text-orange-400" />
                  )}
                </div>
                <div className="p-3">
                  <h2 className="text-lg font-bold">{account.name}</h2>
                  <p>{account.balance}€</p>
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
}
