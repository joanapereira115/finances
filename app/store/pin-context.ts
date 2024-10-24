import { createSlice } from '@reduxjs/toolkit';

export const pinSlice = createSlice({
  name: 'pin',
  initialState: '',
  reducers: {
    update: (state, action) => {
      return action.payload;
    },
  },
});

export const { update } = pinSlice.actions;
export const selectedPin = (state) => state.pin;

export default pinSlice.reducer;
