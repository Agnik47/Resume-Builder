import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './resumeSlice';

export const store = configureStore({
  reducer: {
    // This is where you will add all your feature slices
    resume: resumeReducer,
  },
});