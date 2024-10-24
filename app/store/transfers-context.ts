import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from './store';
import { Transfer } from '../lib/definitions';
import { newTransferHandler } from '@/app/lib/actions';
import {
  fetchTransfers,
  deleteTransfer as deleteTransferLogic,
  editTransfer,
} from '../lib/transfers';

const getPin = (getState: () => RootState): string | undefined => {
  return (getState() as RootState).pin;
};

const getYear = (getState: () => RootState): number | undefined => {
  return (getState() as RootState).year;
};

const fulfilledReducer = (
  state: Transfer[],
  action: { payload?: Transfer[] },
): Transfer[] => {
  return action.payload !== undefined ? action.payload : state;
};

export const getTransfers = createAsyncThunk(
  'transfer/getTransfers',
  async (_, { getState }) => {
    const pin = getPin(getState as () => RootState);
    const year = getYear(getState as () => RootState);
    if (pin) {
      return await fetchTransfers(pin, year);
    }
  },
);

export const addTransfer = createAsyncThunk(
  'transfer/addTransfer',
  async (transfer: FormData, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await newTransferHandler(transfer, pin);
    }
  },
);

export const deleteTransfer = createAsyncThunk(
  'transfer/deleteTransfer',
  async (id: string, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await deleteTransferLogic(id, pin);
    }
  },
);

export const updateTransfer = createAsyncThunk(
  'transfer/updateTransfer',
  async (transfer: Transfer, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await editTransfer(transfer, pin);
    }
  },
);

export const transfersSlice = createSlice({
  name: 'transfers',
  initialState: [] as Transfer[],
  reducers: {
    setTransfer: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransfers.fulfilled, fulfilledReducer)
      .addCase(addTransfer.fulfilled, fulfilledReducer)
      .addCase(deleteTransfer.fulfilled, fulfilledReducer)
      .addCase(updateTransfer.fulfilled, fulfilledReducer);
  },
});

export const { setTransfer } = transfersSlice.actions;
export const transferList = (state: RootState) => state.transfers;

export default transfersSlice.reducer;
