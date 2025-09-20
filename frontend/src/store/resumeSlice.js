import { createSlice } from '@reduxjs/toolkit';

// This is the initial state for your resume feature
const initialState = {
  analysis: null, // This will hold the data from the API
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  // These reducers are the only functions that can update the state
  reducers: {
    setAnalysisLoading: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    setAnalysisSuccess: (state, action) => {
      state.status = 'succeeded';
      state.analysis = action.payload; // The payload is the data from your API
    },
    setAnalysisError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

// Export the actions to be used in your components
export const {
  setAnalysisLoading,
  setAnalysisSuccess,
  setAnalysisError,
} = resumeSlice.actions;

// Export the main reducer to be added to the store
export default resumeSlice.reducer;