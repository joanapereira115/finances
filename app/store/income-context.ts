import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState, store } from './store';
import { Income } from '../lib/definitions';
import { newIncomeHandler } from '@/app/lib/actions';
import {
  fetchIncome,
  deleteIncome as deleteIncomeLogic,
  editIncome,
} from '../lib/income';
import { update } from './year-context';

const getPin = (getState: () => RootState): string | undefined => {
  return (getState() as RootState).pin;
};

const getYear = (getState: () => RootState): number | undefined => {
  return (getState() as RootState).year;
};

const fulfilledReducer = (
  state: Income[],
  action: { payload?: Income[] },
): Income[] => {
  if (action.payload !== undefined) {
    action.payload.sort((a: Income, b: Income) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  return action.payload !== undefined ? action.payload : state;
};

export const getIncome = createAsyncThunk(
  'income/getIncome',
  async (_, { getState }) => {
    const pin = getPin(getState as () => RootState);
    const year = getYear(getState as () => RootState);
    if (pin) {
      return await fetchIncome(pin, year);
    }
  },
);

export const addIncome = createAsyncThunk(
  'income/addIncome',
  async (income: FormData, { getState }) => {
    const pin = getPin(getState as () => RootState);
    const year = getYear(getState as () => RootState);
    const incomeYear: number = new Date(
      (income.get('date') as string) || '',
    ).getFullYear();

    if (pin) {
      let incomeList = await newIncomeHandler(income, pin);
      if (incomeYear != year) {
        store.dispatch(update(incomeYear));
      }
      return incomeList;
    }
  },
);

export const deleteIncome = createAsyncThunk(
  'income/deleteIncome',
  async (income: Income, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await deleteIncomeLogic(income.id, income.year, pin);
    }
  },
);

export const updateIncome = createAsyncThunk(
  'income/updateIncome',
  async (income: Income, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await editIncome(income, pin);
    }
  },
);

export const incomeSlice = createSlice({
  name: 'income',
  initialState: [] as Income[],
  reducers: {
    setIncome: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIncome.fulfilled, fulfilledReducer)
      .addCase(addIncome.fulfilled, fulfilledReducer)
      .addCase(deleteIncome.fulfilled, fulfilledReducer)
      .addCase(updateIncome.fulfilled, fulfilledReducer);
  },
});

export const { setIncome } = incomeSlice.actions;
export const incomeList = (state: RootState) => state.income;

export default incomeSlice.reducer;
