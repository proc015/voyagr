import { Trip } from '../types/Trip';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:3000';

export const fetchUserTrips = createAsyncThunk<
  Trip,
  number,
  { rejectValue: string }
>('getTrip/fetchUserTrips', async (user_id, { rejectWithValue }) => {
  console.log('user_id in fetchUserTrips', user_id);
  try {
    const response = await fetch(`${url}/trip/${user_id}`);
    const data = await response.json();
    console.log('data in fetchUserTrips', data);
    return data;
  } catch (err) {
    return rejectWithValue('this is an error');
  }
});
