import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ExpensesByCat } from '@/app/lib/definitions';
import { expenseCategories } from '@/app/lib/categories';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function YearCatg({ expenses }: { expenses: ExpensesByCat[] }) {
  let totalByCatg = expenseCategories?.map((cat) =>
    expenses.reduce((total: number, curr: ExpensesByCat) => {
      if (curr.cat === cat.id) {
        return +total + +curr.value;
      }
      return +total;
    }, 0),
  );

  const data = {
    labels: expenseCategories.map((cat) => cat.name),
    datasets: [
      {
        data: totalByCatg,
        backgroundColor: [
          '#BAEBFF',
          '#BBDBFE',
          '#BCCBFD',
          '#BEBCFC',
          '#BFACFB',
          '#C09CFA',
          '#C18CF9',
          '#AC8BEE',
          '#916DD5',
          '#7151A9',
          '#573D7F',
          '#46325D',
          '#2c0735',
          '#051923',
          '#003554',
          '#006494',
          '#0582ca',
          '#00a6fb',
          '#5aa9e6',
          '#7fc8f8',
          '#779be7',
          '#a480cf',
          '#d264b6',
        ],
        borderColor: [
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mx-4 mt-4 flex h-[84vh] w-full items-center justify-center rounded-xl bg-white p-2 drop-shadow-md">
      <Pie data={data} />
    </div>
  );
}
