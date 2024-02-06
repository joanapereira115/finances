import { configureStore } from '@reduxjs/toolkit';
import yearSlice from '@/app/store/year-context';
import pinSlice from '@/app/store/pin-context';

export default configureStore({
  reducer: {
    year: yearSlice,
    pin: pinSlice,
  },
});
