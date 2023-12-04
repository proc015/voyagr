import { createSlice } from '@reduxjs/toolkit';
import { Trip } from '../types/Trip';
import { fetchLastTrip } from '../services/fetchLastTrip';
// import { TripFeed } from './fetchUserFeedSlice';

export interface LastTripState {
  lastTrip: Trip;
  status: 'idle' | 'loading' | 'failed';
  error: string;
}

const initialState = {
  lastTrip: {
    trip_id: 0,
    userId: 0,
    trip_name: '',
    start_loc: '',
    destination: '',
    start_date: '',
    end_date: '',
    start_lat_lon: [0, 0],
    dest_lat_lon: [0, 0],
    picture_src: '',
    published: false,
    activities: [
      {
        activity_id: 0,
        activity_name: '',
        date: '',
        description: '',
        location: '',
        tripId: 0,
        type: '',
        loc_lat_lon: [0],
      },
    ],
  },
  status: 'idle',
  error: '',
};

export const lastTripSlice = createSlice({
  name: 'lastTrip',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchLastTrip.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLastTrip.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastTrip = action.payload;
      })
      .addCase(fetchLastTrip.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// export const { setLastTrip } = lastTripSlice.actions;

export default lastTripSlice.reducer;
