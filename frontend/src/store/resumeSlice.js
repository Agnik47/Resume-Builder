import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  analysis: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setAnalysisLoading: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    setAnalysisSuccess: (state, action) => {
      state.status = 'succeeded';
      state.analysis = action.payload;
    },
    setAnalysisError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    // Add this reducer to reset the state
    resetAnalysis: (state) => {
      state.status = 'idle';
      state.analysis = null;
      state.error = null;
    },
  },
});

// Export the new action
export const {
  setAnalysisLoading,
  setAnalysisSuccess,
  setAnalysisError,
  resetAnalysis, // <-- Export it here
} = resumeSlice.actions;

export default resumeSlice.reducer;