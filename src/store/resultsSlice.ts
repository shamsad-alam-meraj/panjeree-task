import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultState, ExamResult } from '@/types';

const initialState: ResultState = {
  results: [],
  currentResult: null,
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    saveResult: (state, action: PayloadAction<ExamResult>) => {
      state.results.push(action.payload);
      state.currentResult = action.payload;
    },
    setCurrentResult: (state, action: PayloadAction<ExamResult>) => {
      state.currentResult = action.payload;
    },
    clearCurrentResult: (state) => {
      state.currentResult = null;
    },
  },
});

export const { saveResult, setCurrentResult, clearCurrentResult } = resultsSlice.actions;
export default resultsSlice.reducer;
