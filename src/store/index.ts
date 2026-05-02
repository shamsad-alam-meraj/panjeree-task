import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import examsReducer from './examsSlice';
import resultsReducer from './resultsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examsReducer,
    results: resultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
