'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
    <div className="bg-black-800 fixed h-[100px]" style={{ width: 'calc(100% - 100px)' }}>
      <div className="mr-5 flex h-full flex-row items-center">
        <Title />
        <div className="ml-auto">
          <Year years={years} />
        </div>
      </div>
    </div>
  );
}
