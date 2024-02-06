'use client';

import clsx from 'clsx';
import {
  PlusCircleIcon,
  MinusCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

import { History } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';

export default function HistoryTable({ history }: { history: History[] }) {
  return (
    <div
      className={clsx(
        'ml-4 mt-4 flex h-[30vh] grow flex-col rounded-xl bg-white p-4 drop-shadow-md',
        {
          'justify-between': history?.length === 5,
        },
      )}
    >
      {history === undefined ||
        (history?.length === 0 && (
          <div className="flex h-full flex-row items-center justify-center p-2">
            <ExclamationCircleIcon className="pointer-events-none mr-2 h-[24px] w-[24px] text-red-500" />
            <p className="text-gray-400">Não foi encontrada informação.</p>
          </div>
        ))}
      {history?.map((hist, i) => {
        return (
          <div
            key={hist.id}
            className={clsx('flex flex-row items-center justify-between p-2', {
              'border-t': i !== 0,
              'p-4': history?.length !== 5,
            })}
          >
            <div className="flex w-full items-center">
              {hist.type === 'income' ? (
                <PlusCircleIcon className="pointer-events-none mr-2 h-[18px] w-[18px] text-green-500" />
              ) : (
                <MinusCircleIcon className="pointer-events-none mr-2 h-[18px] w-[18px] text-red-500" />
              )}
              <p className="w-[25%] text-base font-semibold">{hist.name}</p>
              <p className="w-[30%]">{formatDateToLocal(hist.date)}</p>
            </div>
            <p className="w-[10%] text-base font-medium">{hist.value}€</p>
          </div>
        );
      })}
    </div>
  );
}
