'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

import Year from '@/app/ui/dashboard/Year';
import Title from '@/app/ui/dashboard/Title';
import { getAvailableYears } from '@/app/lib/accounts';
import { selectedPin } from '@/app/store/pin-context';

export default function TopBar() {
  const pin = useSelector(selectedPin);
  const [years, setYears] = useState({
    availableYears: [],
    currentYear: undefined,
  });

  useEffect(() => {
    const getData = async () => {
      setYears(await getAvailableYears(pin));
    };

    getData();
  }, [pin]);

  return (
    <div className="sticky h-[12vh] w-full bg-gradient-to-r from-lilac-800 to-lilac-100 drop-shadow-md">
      <div className="mr-4 flex h-full flex-row items-center">
        <Image
          className="ml-4 rotate-45 drop-shadow-md"
          src="/logo.png"
          width={65}
          height={65}
          alt="Logo"
        />
        <Title />
        <div className="ml-auto">
          <Year years={years} />
        </div>
      </div>
    </div>
  );
}
