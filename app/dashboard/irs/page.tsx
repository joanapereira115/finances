'use client';

import IRS from '@/app/ui/irs/IRS';
import IRSForm from '@/app/ui/irs/IRSForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectedPin } from '@/app/store/pin-context';
import { useRouter } from 'next/navigation';
import { irsData } from '@/app/store/irs-context';

export default function Page() {
  const router = useRouter();
  const pin = useSelector(selectedPin);
  const irs = useSelector(irsData);

  useEffect(() => {
    if (!pin) {
      router.replace('/');
    }
  }, [router, pin]);

  return (
    <div className="mt-4 flex w-full">
      <div className="mx-4 w-[30%]">
        <IRSForm irsData={irs} />
        <p className="m-4 text-sm text-gray-200">
          <i>
            * Esta simulação não contempla todas situações existentes para o
            cálculo do valor do IRS a pagar ou receber, e por isso não deve ser
            considerado como valor exato. É apenas uma simulação de alto nível e
            o valor gerado poderá ser diferente do real.
          </i>
        </p>
      </div>
      <div className="mr-4 w-[70%]">
        <IRS irsData={irs} />
      </div>
    </div>
  );
}
