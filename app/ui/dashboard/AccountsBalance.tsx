'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CreditCardIcon,
  BanknotesIcon,
  ShoppingCartIcon,
  ArrowTrendingUpIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

import { selectedPin } from '@/app/store/pin-context';
import { selectedYear } from '@/app/store/year-context';
import { fetchAccounts } from '@/app/lib/accounts';

export default async function AccountsBalance() {
  const [accounts, setAccounts] = useState([]);
  const pin = useSelector(selectedPin);
  const year = useSelector(selectedYear);

  useEffect(() => {
    const getData = async () => {
      setAccounts(await fetchAccounts(pin));
    };

    getData();
  }, [pin, year]);

  return (
    <div className="mr-2 mt-4 flex h-[44vh] grow flex-col justify-between rounded-xl bg-white p-4 drop-shadow-md">
      {accounts && accounts.length > 0 ? (
        <div className="overflow-y-auto overflow-x-hidden">
          {accounts.map(
            (account) =>
              account.active && (
                <div
                  key={account.id}
                  className="grid w-full grid-cols-[10%_90%] gap-2"
                >
                  <div className="flex items-center">
                    {account.type === 'CARD' && (
                      <CreditCardIcon className="pointer-events-none mr-2 h-9 w-9 text-sky-500" />
                    )}
                    {account.type === 'MONE' && (
                      <BanknotesIcon className="pointer-events-none mr-2 h-9 w-9 text-green-400" />
                    )}
                    {account.type === 'MEAL' && (
                      <ShoppingCartIcon className="pointer-events-none mr-2 h-9 w-9 text-lilac-100" />
                    )}
                    {account.type === 'SAVI' && (
                      <KeyIcon className="pointer-events-none mr-2 h-9 w-9 text-yellow-300" />
                    )}
                    {account.type === 'INVE' && (
                      <ArrowTrendingUpIcon className="pointer-events-none mr-2 h-9 w-9 text-orange-400" />
                    )}
                  </div>
                  <div className="p-2">
                    <h2 className="text-lg font-bold">{account.name}</h2>
                    <p>{account.balance}€</p>
                  </div>
                </div>
              ),
          )}
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
