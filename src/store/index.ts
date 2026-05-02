import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import examsReducer from './examsSlice';
import resultsReducer from './resultsSlice';
import { AuthState } from '@/types';

// ─── LocalStorage persistence ────────────────────────────────────────────────

const AUTH_KEY = 'panjeree__auth';

function loadAuthState(): { auth: AuthState } | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return undefined;
    return { auth: JSON.parse(raw) as AuthState };
  } catch {
    return undefined;
  }
}

function saveAuthState(auth: AuthState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  } catch {
    // storage full or unavailable – fail silently
  }
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examsReducer,
    results: resultsReducer,
  },
  preloadedState: loadAuthState(),
});

// Subscribe to persist auth slice changes
store.subscribe(() => {
  saveAuthState(store.getState().auth);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
