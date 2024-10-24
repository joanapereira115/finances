import { createSlice } from '@reduxjs/toolkit';

export const yearSlice = createSlice({
  name: 'year',
  initialState: 0,
  reducers: {
    update: (state, action) => {
      return action.payload;
    },
  },
});

export const { update } = yearSlice.actions;
export const selectedYear = (state) => state.year;

export default yearSlice.reducer;
