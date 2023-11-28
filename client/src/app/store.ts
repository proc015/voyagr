import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tripReducer from '../redux/addTripSlice';
import activityReducer from '../redux/addActivitySlice'
import fetchTripReducer from '../redux/fetchTripSlice';

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    activity: activityReducer, 
    getTrip: fetchTripReducer, 
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
