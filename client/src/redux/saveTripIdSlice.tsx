import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip } from '../types/Trip';

interface TripState {
  currentTrip: number;
}

const initialState: TripState = {
    currentTrip: 0, 
}

export const saveTripIdSlice = createSlice({
    name: 'tripid',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      setTrip: (state, action: PayloadAction<number>) => {
        state.currentTrip = action.payload;
      },
      clearTrip: (state) => {
        state.currentTrip = 0;
      }
    },
  });
  
  export const { setTrip, clearTrip } = saveTripIdSlice.actions;
  
  export default saveTripIdSlice.reducer;