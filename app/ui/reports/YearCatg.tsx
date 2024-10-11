import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ExpensesByCat } from '@/app/lib/definitions';
import { expenseCategories } from '@/app/lib/categories';
import EmptyData from '../ui/EmptyData';
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
        ],
        borderColor: [
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
        ],
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      subtitle: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-black-600 flex h-[50vh] flex-col justify-between rounded-xl p-4 text-white drop-shadow-md">
      {totalByCatg.every((item) => item === 0) ? (
        <EmptyData />
      ) : (
        <div className="overflow-x-hidden overflow-y-hidden text-center">
          <h2 className="m-2 text-lg font-bold">Despesas por categoria</h2>
          <div className="flex items-center justify-center">
            <Doughnut
              className="translate-y-[-2rem] scale-[.75]"
              data={data}
              options={options}
            />
          </div>
        </div>
      )}
    </div>
  );
}
