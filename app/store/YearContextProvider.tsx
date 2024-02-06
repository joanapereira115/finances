'use client';

import React from 'react';
import store from '@/app/store/store';
import { Provider } from 'react-redux';

const YearContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default YearContextProvider;
