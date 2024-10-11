import clsx from 'clsx';

import { ExpensesByCat } from '@/app/lib/definitions';
import { expenseCategories } from '@/app/lib/categories';

export default function TopCatg({ expenses }: { expenses: ExpensesByCat[] }) {
  let totalExp = expenseCategories?.map((cat) =>
    expenses.reduce((total: number, curr: ExpensesByCat) => {
      if (curr.cat === cat.id) {
        return +total + +curr.value;
      }
      return +total;
    }, 0),
  );

  const backgroundColor = [
    '#d264b6',
    '#de81f6',
    '#cfa8e7',
    '#BEBCFC',
    '#BFACFB',
    '#C09CFA',
    '#C18CF9',
    '#a480cf',
    '#AC8BEE',
    '#916DD5',
    '#7151A9',
    '#573D7F',
    '#BAEBFF',
    '#BBDBFE',
    '#BCCBFD',
    '#21afd5',
    '#0582ca',
    '#00a6fb',
    '#5aa9e6',
    '#7fc8f8',
    '#779be7',
    '#051923',
    '#003554',
    ,
  ];

  let totalByCatg = expenseCategories.map((exp, i) => {
    return {
      cat: exp.name,
      value: +totalExp[i].toFixed(2),
      color:
        backgroundColor[
          expenseCategories.findIndex((item) => item.name === exp.name)
        ],
    };
  });

  totalByCatg.sort((a, b) => {
    return +b.value - +a.value;
  });

  const topCatg = totalByCatg.splice(0, 5);

  return (
    <div className="mt-4 flex h-[32vh] items-center justify-center rounded-xl bg-black-600 text-white p-2 drop-shadow-md">
      <div className="overflow-hidden text-center ">
        <h2 className="m-2 text-lg font-bold">
          Categorias com maiores despesas
        </h2>
        {topCatg.map((cat, i) => (
          <div key={cat.cat} className="border-b border-gray-500 last-of-type:border-none">
            <p className="flex justify-between py-2">
              <span className="w-[20%] font-bold">
                <span
                  style={{ backgroundColor: cat.color }}
                  className={clsx(
                    +i + 1 === 1
                      ? `rounded-full px-2.5 py-1`
                      : 'rounded-full px-2 py-1',
                  )}
                >
                  {i + 1}
                </span>
              </span>
              <span className="w-[50%]">{cat.cat}</span>
              <span className="w-[30%] font-bold">{cat.value}€</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
