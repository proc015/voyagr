import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Trip } from '../types/Trip';
import { fetchUserTrips } from '../services/fetchTrip';

export interface LastTripState {
  lastTrip: Trip | null;  // Changed to null for initial state
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;   // Error can be null initially
}

const initialState: LastTripState = {
  lastTrip: null,  // Initially, there's no last trip
  status: 'idle',
  error: null,
};

// Async thunk to fetch the last trip
export const fetchLastTrip = createAsyncThunk(
  'lastTrip/fetchLastTrip',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserTrips(); // Assume fetchUserTrips returns the last trip
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const lastTripSlice = createSlice({
  name: 'lastTrip',
  initialState,
  reducers: {
    // Reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastTrip.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLastTrip.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Check if the last trip is not published and update the state accordingly
        if (!action.payload.published) {
          state.lastTrip = action.payload;
        } else {
          state.lastTrip = null; // Reset the state if the last trip is published
        }
      })
      .addCase(fetchLastTrip.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default lastTripSlice.reducer;
