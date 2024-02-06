'use client';

import { usePathname } from 'next/navigation';

const pageTitles = [
  { path: '/dashboard', title: 'Página Inicial' },
  { path: '/dashboard/expenses', title: 'Despesas' },
  { path: '/dashboard/income', title: 'Rendimentos' },
  { path: '/dashboard/accounts', title: 'Contas' },
  { path: '/dashboard/reports', title: 'Relatórios' },
  { path: '/dashboard/irs', title: 'IRS' },
];

export default function Title() {
  const pathname = usePathname();
  const title = pageTitles.find((page) => page.path === pathname)?.title || '';

  return <h1 className="px-8 text-2xl font-bold text-white">{title}</h1>;
}
