import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from './store';
import { Account } from '../lib/definitions';
import { newAccountHandler } from '@/app/lib/actions';
import {
  editAccount,
  fetchAccounts,
  inactivateAccount,
} from '@/app/lib/accounts';

const getPin = (getState: () => RootState): string | undefined => {
  return (getState() as RootState).pin;
};

const fulfilledReducer = (
  state: Account[],
  action: { payload?: Account[] },
): Account[] => {
  return action.payload !== undefined ? action.payload : state;
};

export const getAccounts = createAsyncThunk(
  'accounts/getAccounts',
  async (_, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await fetchAccounts(pin);
    }
  },
);

export const addAccount = createAsyncThunk(
  'accounts/addAccount',
  async (account: FormData, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await newAccountHandler(account, pin);
    }
  },
);

export const deleteAccount = createAsyncThunk(
  'accounts/deleteAccount',
  async (id: string, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await inactivateAccount(id, pin);
    }
  },
);

export const updateAccount = createAsyncThunk(
  'accounts/updateAccount',
  async (account: Account, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await editAccount(account, pin);
    }
  },
);

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState: [] as Account[],
  reducers: {
    setAccounts: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.fulfilled, fulfilledReducer)
      .addCase(addAccount.fulfilled, fulfilledReducer)
      .addCase(deleteAccount.fulfilled, fulfilledReducer)
      .addCase(updateAccount.fulfilled, fulfilledReducer);
  },
});

export const { setAccounts } = accountsSlice.actions;
export const accountsList = (state: RootState) => state.accounts;

export default accountsSlice.reducer;
