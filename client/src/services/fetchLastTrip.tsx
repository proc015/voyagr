import { Trip } from '../types/Trip';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:3000';

export const fetchLastTrip = createAsyncThunk<
  Trip,
  number,
  { rejectValue: string }
>('getLastTrip/fetchLastTrip', async (user_id, { rejectWithValue }) => {
  console.log('user_id in fetchLastTrip', user_id);
  try {
    const response = await fetch(`${url}/lastTrip/${user_id}`);
    const data = await response.json();
    console.log('data in fetchLastTrip', data);
    return data;
  } catch (err) {
    return rejectWithValue('Error fetching last trip');
  }
});
