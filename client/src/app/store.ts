import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tripReducer from '../redux/addTripSlice';

export const store = configureStore({
  reducer: {
    trip: tripReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
