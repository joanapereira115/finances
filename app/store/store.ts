import { configureStore } from '@reduxjs/toolkit';
import yearSlice from '@/app/store/year-context';
import pinSlice from '@/app/store/pin-context';
import expensesSlice from '@/app/store/expenses-context';
import incomeSlice from '@/app/store/income-context';
import accountsSlice from '@/app/store/accounts-context';
import transfersSlice from './transfers-context';
import irsSlice from './irs-context';

export const store = configureStore({
  reducer: {
    year: yearSlice,
    pin: pinSlice,
    expenses: expensesSlice,
    income: incomeSlice,
    accounts: accountsSlice,
    transfers: transfersSlice,
    irs: irsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
