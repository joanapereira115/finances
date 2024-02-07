'use client';

import IRS from '@/app/ui/irs/IRS';
import IRSForm from '@/app/ui/irs/IRSForm';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedPin } from '@/app/store/pin-context';
import { selectedYear } from '@/app/store/year-context';
import { fetchIRS } from '@/app/lib/irs';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [updated, setUpdated] = useState(false);
  const [irsData, setIrsData] = useState(null);
  const pin = useSelector(selectedPin);
  const year = useSelector(selectedYear);
  let selYear = 0;
  if (year !== undefined) {
    selYear = +year;
  }

  useEffect(() => {
    const getData = async () => {
      setIrsData(await fetchIRS(pin, year));
    };

    if (!pin) {
      router.replace('/');
    } else {
      getData();
    }
  }, [pin, year, updated]);

  return (
    <div className="grid w-full grid-cols-[32%_65.5%] gap-4">
      <div>
        <IRSForm irsData={irsData} updateHandler={setUpdated} />
        <p className="m-4 text-gray-200">
          <i>
            Esta simulação não contempla todas situações existentes para o
            cálculo do valor do IRS a pagar ou receber, e por isso não deve ser
            considerado como valor exato. É apenas uma simulação de alto nível e
            o valor gerado poderá ser diferente do real.
          </i>
        </p>
      </div>
      <div>
        <IRS irsData={irsData} />
      </div>
    </div>
  );
}
