'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedPin } from '@/app/store/pin-context';
import { selectedYear } from '@/app/store/year-context';
import { fetchMonthlyAccumulated } from '@/app/lib/data';

let columns = [
  'Jan',
  'Feb',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

export default function HistoryTable() {

  let history = [];

  const [monthlyBalance, setMonthlyBalance] = useState(null);
  const pin = useSelector(selectedPin);
  const year = useSelector(selectedYear);

  useEffect(() => {
    const getData = async () => {
      setMonthlyBalance(await fetchMonthlyAccumulated(pin, year));
    };

    getData();
  }, [pin, year]);

  if (history === undefined) {

  }

  return (
    <div className="bg-black-600 rounded-xl px-4 py-2 text-white drop-shadow-md mt-4 mr-4 justify-center overflow-scroll" style={{ width: 'calc(100% - 1rem)' }}>
      <div className="inline-block min-w-[99%] align-middle overflow-scroll">
        <table className="w-full overflow-scroll">
          <thead className="text-left text-sm font-normal">
            <tr className="border-b">
            <th scope="col" className="px-3 py-3 font-bold"></th>
              {columns?.map((col) => (
                <th key={col} scope="col" className="px-3 py-3 font-bold">
                  <span className="flex items-center">
                      {col}</span> </th> ))} </tr> </thead>
                      <tbody>
                      <tr
                
                className="border-b border-gray-700 py-2 text-sm last-of-type:border-none"
              ><td
              >Rendimentos</td>
                      {monthlyBalance?.map((item, ind) => (
              
                <td
                key={`inc${ind}`}
                      className="py-3 pl-2 pr-2"
                    >
                      {item.income}
                    </td>
                ))}
              </tr>

              <tr
                
                className="border-b border-gray-700 py-2 text-sm last-of-type:border-none"
              ><td
              >Despesas</td>
                      {monthlyBalance?.map((item, ind) => (
              
                <td
                key={`exp${ind}`}
                      className="py-3 pl-2 pr-2"
                    >
                      {item.expense}
                    </td>
                ))}
              </tr>

              <tr
                
                className="border-b border-gray-700 py-2 text-sm last-of-type:border-none"
              ><td
              >Diferença</td>
                      {monthlyBalance?.map((item, ind) => (
              
                <td
                key={`dif${ind}`}
                      className="py-3 pl-2 pr-2"
                    >
                      {item.difference}
                    </td>
                ))}
              </tr> 
                      </tbody>
                       </table> </div> </div>
  );
}
