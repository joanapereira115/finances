'use client';

import { useSelector } from 'react-redux';
import {
  CreditCardIcon,
  BanknotesIcon,
  ShoppingCartIcon,
  ArrowTrendingUpIcon,
  LockClosedIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

import { accountsList } from '@/app/store/accounts-context';
import EmptyData from '../ui/EmptyData';

export default function AccountsBalance() {
  const accounts = useSelector(accountsList);

  let activeAccounts = accounts.filter((acc) => acc.active === true);

  if (!activeAccounts || activeAccounts.length === 0) {
    return (
      <div className="mr-4 flex h-[35vh] flex-row">
        <EmptyData />
      </div>
    );
  }

  return (
    <div className="mr-4 flex h-[35vh] flex-col justify-between rounded-xl bg-black-600 p-4 text-white drop-shadow-md">
      <div className="overflow-y-auto overflow-x-hidden">
        {activeAccounts.map(
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
                      account.type !== activeAccounts[+i - 1].type)) && (
                    <CreditCardIcon className="pointer-events-none mx-2 h-9 w-9 text-blue-600" />
                  )}
                  {((account.type === 'MONE' && i === 0) ||
                    (account.type === 'MONE' &&
                      i !== 0 &&
                      account.type !== activeAccounts[+i - 1].type)) && (
                    <BanknotesIcon className="pointer-events-none mx-2 h-9 w-9 text-green-400" />
                  )}
                  {((account.type === 'MEAL' && i === 0) ||
                    (account.type === 'MEAL' &&
                      i !== 0 &&
                      account.type !== activeAccounts[+i - 1].type)) && (
                    <ShoppingCartIcon className="pointer-events-none mx-2 h-9 w-9 text-lilac-100" />
                  )}
                  {((account.type === 'SAVI' && i === 0) ||
                    (account.type === 'SAVI' &&
                      i !== 0 &&
                      account.type !== activeAccounts[+i - 1].type)) && (
                    <LockClosedIcon className="pointer-events-none mx-2 h-9 w-9 text-yellow-300" />
                  )}
                  {((account.type === 'INVE' && i === 0) ||
                    (account.type === 'INVE' &&
                      i !== 0 &&
                      account.type !== activeAccounts[+i - 1].type)) && (
                    <ArrowTrendingUpIcon className="pointer-events-none mx-2 h-9 w-9 text-red-400" />
                  )}
                  {((account.type === 'CEAF' && i === 0) ||
                    (account.type === 'CEAF' &&
                      i !== 0 &&
                      account.type !== activeAccounts[+i - 1].type)) && (
                    <BuildingLibraryIcon className="pointer-events-none mx-2 h-9 w-9 text-orange-400" />
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
    </div>
  );
}
