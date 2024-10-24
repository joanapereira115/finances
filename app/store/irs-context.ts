import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from './store';
import { IRSDef } from '../lib/definitions';
import { fetchIRS } from '../lib/irs';
import { updateIRS as updateIRSLogic } from '../lib/irs';

const getPin = (getState: () => RootState): string | undefined => {
  return (getState() as RootState).pin;
};

const getYear = (getState: () => RootState): number | undefined => {
  return (getState() as RootState).year;
};

const fulfilledReducer = (
  state: IRSDef,
  action: { payload?: IRSDef },
): IRSDef => {
  return action.payload !== undefined ? action.payload : state;
};

export const getIRS = createAsyncThunk(
  'irs/getIRS',
  async (_, { getState }) => {
    const pin = getPin(getState as () => RootState);
    const year = getYear(getState as () => RootState);
    if (pin) {
      return await fetchIRS(pin, year);
    }
  },
);

export const updateIRS = createAsyncThunk(
  'irs/updateIRS',
  async (irs: IRSDef, { getState }) => {
    const pin = getPin(getState as () => RootState);
    if (pin) {
      return await updateIRSLogic(pin, irs);
    }
  },
);

export const irsSlice = createSlice({
  name: 'irs',
  initialState: {} as IRSDef,
  reducers: {
    setIRS: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIRS.fulfilled, fulfilledReducer)
      .addCase(updateIRS.fulfilled, fulfilledReducer);
  },
});

export const { setIRS } = irsSlice.actions;
export const irsData = (state: RootState) => state.irs;

export default irsSlice.reducer;
