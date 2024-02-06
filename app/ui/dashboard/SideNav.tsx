'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import {
  HomeIcon,
  BanknotesIcon,
  CurrencyEuroIcon,
  WalletIcon,
  ChartPieIcon,
  ReceiptPercentIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Expenses', href: '/dashboard/expenses', icon: BanknotesIcon },
  { name: 'Income', href: '/dashboard/income', icon: CurrencyEuroIcon },
  { name: 'Accounts', href: '/dashboard/accounts', icon: WalletIcon },
  { name: 'Reports', href: '/dashboard/reports', icon: ChartPieIcon },
  { name: 'IRS', href: '/dashboard/irs', icon: ReceiptPercentIcon },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="sticky flex h-full items-center bg-white px-6 drop-shadow-md">
      <div className="flex flex-grow flex-col">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link key={link.name} href={link.href}>
              <LinkIcon
                color="#555985"
                className={clsx('w-10 py-4 hover:scale-110 hover:opacity-100', {
                  'opacity-60': pathname !== link.href,
                  'scale-110': pathname === link.href,
                })}
              />
            </Link>
          );
        })}
        <div className="absolute bottom-4">
          <Link href="/">
            <PowerIcon color="#555985" className="w-10 hover:scale-110" />
          </Link>
        </div>
      </div>
    </div>
  );
}
