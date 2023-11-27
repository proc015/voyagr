import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Trip } from '../types/Trip';

const initialState: Trip[] = [];

export const addTripSlice = createSlice({
  name: 'trips',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addTrip: (state, action: PayloadAction<Trip>) => {
      state.push(action.payload);
    },
  },
});

export const { addTrip } = addTripSlice.actions;

export default addTripSlice.reducer;
