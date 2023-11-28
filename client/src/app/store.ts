import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tripReducer from '../redux/addTripSlice';
import activityReducer from '../redux/addActivitySlice'
import fetchTripReducer from '../redux/fetchTripSlice';
import fetchActivityReducer from '../redux/fetchActivitySlice';

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    activity: activityReducer, 
    getTrip: fetchTripReducer, 
    getActivity: fetchActivityReducer, 
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
