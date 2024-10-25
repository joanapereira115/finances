import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState, store } from './store';
import { newExpenseHandler } from '@/app/lib/actions';
import { Expense } from '../lib/definitions';
import {
  fetchExpenses,
  deleteExpense as deleteExpenseLogic,
  editExpense,
} from '@/app/lib/expenses';
import { update } from './year-context';

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
  if (action.payload !== undefined) {
    action.payload.sort((a: Expense, b: Expense) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

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
    const year = getYear(getState as () => RootState);
    const expenseYear: number = new Date(
      (expense.get('date') as string) || '',
    ).getFullYear();
    console.log('expenseYear: ', expenseYear);
    console.log('year: ', year);

    if (pin) {
      let expenses = await newExpenseHandler(expense, pin);
      if (expenseYear != year) {
        store.dispatch(update(expenseYear));
      }
      return expenses;
    }
  },
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (expense: Expense, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await deleteExpenseLogic(expense.id, expense.year, pin);
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
