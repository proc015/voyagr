import { Trip } from '../types/Trip';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:3000';

export const fetchUserFeed = createAsyncThunk<Trip[]>(
  'getTrip/fetchUserTrips',
  async () => {
    try {
      const response = await fetch(`${url}/trip/all`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
