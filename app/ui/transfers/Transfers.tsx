'use client';

import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { selectedPin } from '@/app/store/pin-context';
import Pagination from '@/app/ui/ui/Pagination';
import { useSearchParams } from 'next/navigation';
import { selectedYear } from '@/app/store/year-context';
import { Account } from '@/app/lib/definitions';
import TransferTable from '@/app/ui/transfers/TransferTable';
import { fetchTransfers } from '@/app/lib/transfers';

export default function Transfers({
  accounts,
  updated,
  updateHandler,
}: {
  accounts: Account[];
  updated: boolean;
  updateHandler: Dispatch<SetStateAction<boolean>>;
}) {
  const [transfers, setTransfers] = useState([]);
  const pin = useSelector(selectedPin);
  const year = useSelector(selectedYear);
  let selYear = 0;
  if (year !== undefined) {
    selYear = +year;
  }

  useEffect(() => {
    const getData = async () => {
      setTransfers(await fetchTransfers(pin, year));
    };

    getData();
  }, [pin, year, updated]);

  const searchParams = useSearchParams();
  const page: string = searchParams.get('page') || '1';
  const indexInit = (+page - 1) * 10;

  if (!transfers || transfers.length === 0) {
    return (
      <div className="mt-4 flex h-full flex-row items-center justify-center rounded-xl bg-white p-2 drop-shadow-md">
        <ExclamationCircleIcon className="pointer-events-none mr-2 h-[24px] w-[24px] text-red-500" />
        <p className="text-gray-400">Não foi encontrada informação.</p>
      </div>
    );
  }

  const transfersPage = [...transfers.slice(indexInit, indexInit + 10)];

  return (
    <div className="mt-4 justify-center">
      <TransferTable
        transfers={transfersPage}
        accounts={accounts}
        pin={pin}
        transfersUpdate={updateHandler}
      />
      <div className="text-center">
        <Pagination totalElems={transfers.length} page={page} />
      </div>
    </div>
  );
}
