import { Activity } from '../types/Activity';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:3000';

export const fetchUserActivity = createAsyncThunk<
  Activity[],
  number,
  { rejectValue: string }
>('getActivity/fetchUserActivity', async (trip_id, { rejectWithValue }) => {
  console.log('hello');
  try {
    const response = await fetch(`${url}/activity/${trip_id}/all`);
    const data = await response.json();
    return data.activities;
  } catch (err) {
    return rejectWithValue('this is an error');
  }
});
