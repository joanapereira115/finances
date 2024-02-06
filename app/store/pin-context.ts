import { createSlice } from '@reduxjs/toolkit';

export const pinSlice = createSlice({
  name: 'pin',
  initialState: {
    value: '',
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { update } = pinSlice.actions;
export const selectedPin = (state) => state.pin.value;

export default pinSlice.reducer;
