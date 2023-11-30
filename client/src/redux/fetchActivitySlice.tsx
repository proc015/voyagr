import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Activity } from '../types/Activity';
import { fetchUserActivity } from '../services/fetchActivity';

export interface ActivityState {
  activities: Activity[];
  status: 'idle' | 'loading' | 'failed';
  error: string;
}

const initialState = {
  activities: [
    {
      trip_id: 0,
      activity_name: '',
      activity_id: 0,
      location: '',
      type: '',
      date: '',
      loc_lat_lon: [0, 0],
    },
  ],
  status: 'idle',
  error: '',
};

export const fetchActivitySlice = createSlice({
  name: 'getActivity',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserActivity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserActivity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activities = action.payload;
      })
      .addCase(fetchUserActivity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default fetchActivitySlice.reducer;
