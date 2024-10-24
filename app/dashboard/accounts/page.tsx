'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { selectedPin } from '@/app/store/pin-context';
import { accountsList } from '@/app/store/accounts-context';
import AccountForm from '@/app/ui/accounts/AccountForm';
import Accounts from '@/app/ui/accounts/Accounts';

export default function Page() {
  const pin = useSelector(selectedPin);
  const accounts = useSelector(accountsList);
  const router = useRouter();

  useEffect(() => {
    if (!pin) {
      router.replace('/');
    }
  }, [router, pin]);

  return (
    <div className="mt-4 flex w-full">
      <div className="mx-4 w-[30%]">
        <AccountForm />
      </div>
      <div className="mr-4 w-[70%]">
        <Accounts accounts={accounts} />
      </div>
    </div>
  );
}
