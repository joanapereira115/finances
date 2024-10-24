'use client';

import { Provider } from 'react-redux';

import { store } from '@/app/store/store';
import Pin from '@/app/ui/homepage/Pin';

export default function Page() {
  return (
    <div className="flex h-[100vh] overflow-hidden bg-black-800">
      <Provider store={store}>
        <Pin />
      </Provider>
    </div>
  );
}
