import { ExpensesByCat } from '@/app/lib/definitions';
import { expenseCategories } from '@/app/lib/categories';
import { months } from '@/app/lib/utils';
import clsx from 'clsx';

export default function ExpensesByCatg({
  expenses,
}: {
  expenses: ExpensesByCat[];
}) {
  let monthList = Object.entries(months);
  const currentMonth = new Date().getMonth();

  const totalByCat = {};
  const minMaxValues = {};
  const averageByCat = {};

  expenses.forEach((item) => {
    const { cat, month, value } = item;

    if (!totalByCat[cat]) {
      totalByCat[cat] = 0;
    }

    totalByCat[cat] += +value;

    if (month > currentMonth || value === 0) return;

    if (!minMaxValues[cat]) {
      minMaxValues[cat] = {
        min: value,
        max: value,
      };
    } else {
      minMaxValues[cat].min = Math.min(minMaxValues[cat].min, +value);
      minMaxValues[cat].max = Math.max(minMaxValues[cat].max, +value);
    }
  });

  for (let cat in totalByCat) {
    averageByCat[cat] = +totalByCat[cat] / (+currentMonth + 1);
  }

  return (
    <div className="h-[84vh] w-full justify-center overflow-scroll rounded-xl bg-black-600 p-2 text-white drop-shadow-md">
      <div className="w-full overflow-scroll align-middle">
        <table className="w-full overflow-scroll">
          <thead className="text-left text-sm font-normal">
            <tr className="border-b">
              <th
                scope="col"
                className="sticky left-0 bg-black-600 px-3 py-3 font-bold"
              >
                Categoria
              </th>
              {monthList.map((month) => (
                <th
                  key={month[0]}
                  scope="col"
                  className="px-3 py-3 font-bold"
                  style={{ minWidth: '80px' }}
                >
                  {month[1]}
                </th>
              ))}
              <th
                scope="col"
                className="px-3 py-3 font-bold"
                style={{ minWidth: '80px' }}
              >
                Total
              </th>
              <th
                scope="col"
                className="px-3 py-3 font-bold"
                style={{ minWidth: '80px' }}
              >
                Média
              </th>
            </tr>
          </thead>
          <tbody className="bg-black-600 text-white">
            {expenseCategories?.map((cat, index) => (
              <tr
                key={cat.id}
                className="border-b border-gray-700 py-2 text-sm last-of-type:border-none"
              >
                <td className="sticky left-0 bg-black-600 py-3 pl-3 pr-3 font-bold">
                  {cat.name}
                </td>
                {monthList.map((month) => (
                  <td
                    key={month[0]}
                    className={clsx('py-3 pl-4 pr-4', {
                      'font-bold text-lilac-100':
                        expenses.find(
                          (obj) =>
                            +obj.month === +month[0] - 1 && obj.cat === cat.id,
                        )?.value === minMaxValues[cat.id]?.min &&
                        minMaxValues[cat.id]?.min !==
                          minMaxValues[cat.id]?.max &&
                        +month[0] <= currentMonth,
                      'font-bold text-blue-600':
                        expenses.find(
                          (obj) =>
                            +obj.month === +month[0] - 1 && obj.cat === cat.id,
                        )?.value === minMaxValues[cat.id]?.max &&
                        minMaxValues[cat.id]?.min !== minMaxValues[cat.id]?.max,
                    })}
                  >
                    {
                      expenses.find((obj) => {
                        return (
                          +obj.month === +month[0] - 1 && obj.cat === cat.id
                        );
                      })?.value
                    }
                  </td>
                ))}
                <td className="py-3 pl-4 pr-4">
                  {(+totalByCat[cat.id]).toFixed(2)}
                </td>
                <td className="py-3 pl-4 pr-4">
                  {(+averageByCat[cat.id]).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
