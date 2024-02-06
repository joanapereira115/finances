import { MonthlyBalance } from './definitions';

interface Months {
  [key: number]: string;
}

export const months: Months = {
  1: "Jan",
  2: "Fev",
  3: "Mar",
  4: "Abr",
  5: "Mai",
  6: "Jun",
  7: "Jul",
  8: "Ago",
  9: "Set",
  10: "Out",
  11: "Nov",
  12: "Dez"
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'pt',
) => {
  if (dateStr) {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  }
};

export const generateYAxis = (monthlyBalance: MonthlyBalance[]) => {
  const yAxisLabels = [];
  const highestExpense = monthlyBalance && Array.isArray(monthlyBalance) ? Math.max(...monthlyBalance.map((month) => month.expenses)) : 0;
  const highestIncome = monthlyBalance && Array.isArray(monthlyBalance) ? Math.max(...monthlyBalance.map((month) => month.income)) : 0;
  const highestRecord = highestExpense > highestIncome ? highestExpense : highestIncome;
  //const lowestDifference = Math.min(...monthlyBalance.map((month) => month.difference));
  //const lowestRecord = lowestDifference > 0 ? 0 : lowestDifference;
  const topLabel = Math.ceil(highestRecord / 500) * 500;
  //const lowerLabel = Math.floor(lowestRecord / 500) * 500;

  for (let i = topLabel; i >= 0; i -= 500) {
    yAxisLabels.push(`${i}€`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  let result = [];

  if (totalPages <= 8) {
    result = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage <= 2) {
    result = [1, 2, 3, '...', totalPages - 1, totalPages];
  } else if (currentPage == 3) {
    result = [1, 2, 3, 4, '...', totalPages - 1, totalPages];
  } else if (currentPage >= totalPages - 1) {
    result = [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  } else if (currentPage == totalPages - 2) {
    result = [1, 2, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  } else result = [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];

  return result;
};
