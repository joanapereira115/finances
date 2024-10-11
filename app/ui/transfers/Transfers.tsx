'use client';

import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';

import { selectedPin } from '@/app/store/pin-context';
import Pagination from '@/app/ui/ui/Pagination';
import { useSearchParams } from 'next/navigation';
import { selectedYear } from '@/app/store/year-context';
import { Account } from '@/app/lib/definitions';
import TransferTable from '@/app/ui/transfers/TransferTable';
import { fetchTransfers } from '@/app/lib/transfers';
import EmptyData from '../ui/EmptyData';

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

  if (!transfers || transfers.length === 0) {
    return <EmptyData />;
  }

  return (
    <div className="justify-center">
      <TransferTable
        transfers={transfers}
        page={page}
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
