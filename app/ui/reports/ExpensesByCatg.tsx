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

  return (
    <div className="mx-4 mt-4 flex h-[84vh] w-full justify-between rounded-xl bg-white p-2 drop-shadow-md">
      <div className="overflow-y-auto overflow-x-hidden align-middle">
        <table>
          <thead className="text-left text-sm font-normal">
            <tr className="border-b">
              <th scope="col" className="px-3 py-3 font-bold">
                Categoria
              </th>
              {monthList.map((month) => (
                <th key={month[0]} scope="col" className="px-3 py-3 font-bold">
                  {month[1]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {expenseCategories?.map((cat, index) => (
              <tr
                key={cat.id}
                className={clsx(
                  'border-b py-2 text-sm last-of-type:border-none',
                  {
                    'bg-lilac-50 bg-opacity-20': +index % 2 === 0,
                  },
                )}
              >
                <td className="py-3 pl-3 pr-3">{cat.name}</td>
                {monthList.map((month) => (
                  <td className="py-3 pl-3 pr-3">
                    {
                      expenses.find((obj) => {
                        return (
                          +obj.month === +month[0] - 1 && obj.cat === cat.id
                        );
                      })?.value
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
