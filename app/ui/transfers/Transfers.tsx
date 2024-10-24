'use client';

import { useSelector } from 'react-redux';

import Pagination from '@/app/ui/ui/Pagination';
import { useSearchParams } from 'next/navigation';
import { Account } from '@/app/lib/definitions';
import TransferTable from '@/app/ui/transfers/TransferTable';
import EmptyData from '../ui/EmptyData';
import { transferList } from '@/app/store/transfers-context';

export default function Transfers() {
  const transfers = useSelector(transferList);
  const searchParams = useSearchParams();
  const page: string = searchParams.get('page') || '1';

  if (!transfers || transfers.length === 0) {
    return <EmptyData />;
  }

  return (
    <div className="justify-center">
      <TransferTable transfers={transfers} page={page} />
      <div className="text-center">
        <Pagination totalElems={transfers.length} page={page} />
      </div>
    </div>
  );
}
