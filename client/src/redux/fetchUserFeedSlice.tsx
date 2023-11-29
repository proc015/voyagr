import { createSlice } from '@reduxjs/toolkit';
import { Activity } from '../types/Activity';
import { fetchUserFeed } from '../services/fetchUserFeed';



export interface ActivityFeed {
  activity_id: number; 
  activity_name: string;
  date: string;
  description: string; 
  location: string;
  tripId: number;
  type: string;
  loc_lat_lon: number[];
}


export interface TripFeed {
  trip_id: number;
  userId: number;
  trip_name: string;
  start_loc: string;
  destination: string;
  start_date: string;
  end_date: string;
  start_lat_lon: number[]; 
  dest_lat_lon: number[]; 
  picture_src: string;
  published: boolean;
  activities: ActivityFeed[]; 
}


export interface TripFeedState {
  tripFeed: TripFeed[];
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
