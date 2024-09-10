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
    <div className="mx-4 mt-4 flex justify-center h-[84vh] rounded-xl bg-white p-2 drop-shadow-md">
      <div className="w-full overflow-scroll align-middle">
        <table className='w-full table-fixed'>
          <thead className="text-left text-sm font-normal">
            <tr className="border-b">
              <th scope="col" className="px-3 py-3 w-32 font-bold">
                Categoria
              </th>
              {monthList.map((month) => (
                <th key={month[0]} scope="col" className="px-3 py-3 font-bold">
                  {month[1]}
                </th>
              ))}
              <th scope="col" className="px-3 py-3 font-bold">
                Total
              </th>
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
                  <td key={month[0]} className="py-3 pl-3 pr-3">
                    {
                      expenses.find((obj) => {
                        return (
                          +obj.month === +month[0] - 1 && obj.cat === cat.id
                        );
                      })?.value
                    }
                  </td>
                ))}
                <td className="py-3 pl-3 pr-3">
                  {expenses?.reduce((total: number, curr: ExpensesByCat) => {
                    if (curr.cat === cat.id) {
                      return Number(+total + +curr.value.toFixed(2));
                    }
                    return Number(total.toFixed(2));
                  }, 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
