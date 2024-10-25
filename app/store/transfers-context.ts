import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState, store } from './store';
import { Transfer } from '../lib/definitions';
import { newTransferHandler } from '@/app/lib/actions';
import {
  fetchTransfers,
  deleteTransfer as deleteTransferLogic,
  editTransfer,
} from '../lib/transfers';
import { update } from './year-context';

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
  if (action.payload !== undefined) {
    action.payload.sort((a: Transfer, b: Transfer) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

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
    const year = getYear(getState as () => RootState);
    const transferYear: number = new Date(
      (transfer.get('date') as string) || '',
    ).getFullYear();

    if (pin) {
      let transfers = await newTransferHandler(transfer, pin);
      if (transferYear != year) {
        store.dispatch(update(transferYear));
      }
      return transfers;
    }
  },
);

export const deleteTransfer = createAsyncThunk(
  'transfer/deleteTransfer',
  async (transfer: Transfer, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await deleteTransferLogic(transfer.id, transfer.year, pin);
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
