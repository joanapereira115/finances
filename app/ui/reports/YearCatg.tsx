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
    <div className="mt-4 flex h-[50vh] grow flex-col justify-between rounded-xl bg-white p-4 drop-shadow-md">
      <div className="text-center overflow-x-hidden overflow-y-hidden">
        <h2 className="m-2 text-lg font-bold">Despesas por categoria</h2>
        <div className="flex items-center justify-center">
          <Pie className='scale-75 translate-y-[-2.75rem]' data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
