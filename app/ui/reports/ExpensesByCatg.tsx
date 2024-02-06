import { ExpensesByCat } from '@/app/lib/definitions';
import { expenseCategories } from '@/app/lib/categories';
import { months } from '@/app/lib/utils';

export default function ExpensesByCatg({
  expenses,
}: {
  expenses: ExpensesByCat[];
}) {
  let monthList = Object.entries(months);

  return (
    <div className="mx-4 mt-4 flex h-[80vh] rounded-xl bg-white p-2 drop-shadow-md">
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
              <th scope="col" className="px-3 py-3 font-bold">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {expenseCategories?.map((cat) => (
              <tr
                key={cat.id}
                className="border-b py-2 text-sm last-of-type:border-none"
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
                <td className="py-3 pl-3 pr-3">
                  {expenses.reduce((total: number, curr: ExpensesByCat) => {
                    if (curr.cat === cat.id) {
                      return +total + +curr.value;
                    }
                    return +total;
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
