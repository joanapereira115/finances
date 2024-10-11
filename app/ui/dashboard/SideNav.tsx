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
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Expenses', href: '/dashboard/expenses', icon: BanknotesIcon },
  { name: 'Income', href: '/dashboard/income', icon: CurrencyEuroIcon },
  {
    name: 'Transfers',
    href: '/dashboard/transfers',
    icon: ArrowsRightLeftIcon,
  },
  { name: 'Accounts', href: '/dashboard/accounts', icon: WalletIcon },
  { name: 'Reports', href: '/dashboard/reports', icon: ChartPieIcon },
  { name: 'IRS', href: '/dashboard/irs', icon: ReceiptPercentIcon },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="bg-black-600 sticky flex h-full w-[100px] min-w-[100px] drop-shadow-md">
      <div className="flex w-full flex-col items-center">
        <div className="flex h-[100px] items-center justify-center">
          <Image
            className="rotate-45 drop-shadow-md"
            src="/logo.png"
            width={55}
            height={55}
            alt="Logo"
          />
        </div>
        <div
          className="mt-2 flex flex-col items-center justify-center"
          style={{ height: 'calc(100% - 200px)' }}
        >
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link key={link.name} href={link.href}>
                <LinkIcon
                  color="#FFFFFF"
                  className={clsx(
                    'w-8 py-[1.1rem] hover:scale-110 hover:opacity-100',
                    {
                      'opacity-60': pathname !== link.href,
                      'scale-110': pathname === link.href,
                    },
                  )}
                />
              </Link>
            );
          })}
        </div>
        <div className="absolute bottom-6">
          <Link href="/">
            <PowerIcon color="#FFFFFF" className="w-8 hover:scale-110" />
          </Link>
        </div>
      </div>
    </div>
  );
}
