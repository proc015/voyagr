import { createSlice } from '@reduxjs/toolkit';
import { Trip } from '../types/Trip';
import { fetchUserTrips } from '../services/fetchTrip';


export interface TripFeedState {
  trip: Trip;
  status: 'idle' | 'loading' | 'failed';
  error: string;
}

const initialState = {
  trip: {
    user_id: 0,
    trip_name: '',
    start_loc: '',
    destination: '',
    start_date: '',
    end_date: '',
    start_lat_lon: [0, 0],
    dest_lat_lon: [0, 0],
    picture_src: '',
    published: true, 
    activities: [], 
  },
  status: 'idle',
  error: '',
};

export const fetchTripSlice = createSlice({
  name: 'getAllTrips',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTrips.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserTrips.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trip = action.payload;
      })
      .addCase(fetchUserTrips.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default fetchTripSlice.reducer;
