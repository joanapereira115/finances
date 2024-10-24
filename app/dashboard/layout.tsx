'use client';

import SideNav from '@/app/ui/dashboard/SideNav';
import TopBar from '@/app/ui/dashboard/TopBar';

import { Provider } from 'react-redux';
import { store } from '@/app/store/store';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[100vh] w-full flex-row overflow-hidden">
      <Provider store={store}>
        <SideNav />
        <div className="flex h-full w-full flex-col">
          <TopBar />
          <div className="mt-[100px] flex h-full w-full flex-col bg-black-800">
            {children}
          </div>
        </div>
      </Provider>
    </div>
  );
}
