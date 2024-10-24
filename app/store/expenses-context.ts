import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from './store';
import { newExpenseHandler } from '@/app/lib/actions';
import { Expense } from '../lib/definitions';
import {
  fetchExpenses,
  deleteExpense as deleteExpenseLogic,
  editExpense,
} from '@/app/lib/expenses';

const getPin = (getState: () => RootState): string | undefined => {
  return (getState() as RootState).pin;
};

const getYear = (getState: () => RootState): number | undefined => {
  return (getState() as RootState).year;
};

const fulfilledReducer = (
  state: Expense[],
  action: { payload?: Expense[] },
): Expense[] => {
  return action.payload !== undefined ? action.payload : state;
};

export const getExpenses = createAsyncThunk(
  'expenses/getExpenses',
  async (_, { getState }) => {
    const pin = getPin(getState as () => RootState);
    const year = getYear(getState as () => RootState);
    if (pin) {
      return await fetchExpenses(pin, year);
    }
  },
);

export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async (expense: FormData, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await newExpenseHandler(expense, pin);
    }
  },
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (id: string, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await deleteExpenseLogic(id, pin);
    }
  },
);

export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async (expense: Expense, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await editExpense(expense, pin);
    }
  },
);

// Slice
export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: [] as Expense[],
  reducers: {
    setExpenses: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpenses.fulfilled, fulfilledReducer)
      .addCase(addExpense.fulfilled, fulfilledReducer)
      .addCase(deleteExpense.fulfilled, fulfilledReducer)
      .addCase(updateExpense.fulfilled, fulfilledReducer);
  },
});

// Actions and selectors
export const { setExpenses } = expensesSlice.actions;
export const expensesList = (state: RootState) => state.expenses;

export default expensesSlice.reducer;
