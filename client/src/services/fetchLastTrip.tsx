import { Trip } from '../types/Trip';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:3000';

export const fetchLastTrip = createAsyncThunk<
  Trip, 
  number, 
  { rejectValue: string } 
>('getLastTrip/fetchLastTrip', async (user_id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${url}/lastTrip/${user_id}`);
    const data = await response.json();
    return data; 
  } catch (err) {
    return rejectWithValue('Error fetching last trip');
  }
});
