import { createSlice } from '@reduxjs/toolkit';
import { fetchUserFeed } from '../services/fetchUserFeed';
import { Trip } from '../types/Trip';


export interface TripFeedState {
  tripFeed: Trip[];
  status: 'idle' | 'loading' | 'failed';
  error: string;
}

const initialState = {
  tripFeed: [{
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
        picture_src: ''
      },
    ], 
  }],
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
      .addCase(fetchUserFeed.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserFeed.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tripFeed = action.payload;
      })
      .addCase(fetchUserFeed.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default fetchTripSlice.reducer;
