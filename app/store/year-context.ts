import { createSlice } from '@reduxjs/toolkit';

export const yearSlice = createSlice({
  name: 'year',
  initialState: {
    value: 0,
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { update } = yearSlice.actions;
export const selectedYear = (state) => state.year.value;

export default yearSlice.reducer;
