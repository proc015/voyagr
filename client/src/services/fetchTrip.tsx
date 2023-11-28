
import { Trip } from '../types/Trip';
import { createAsyncThunk } from '@reduxjs/toolkit'

const url = 'http://localhost:3000';



export const fetchUserTrips = createAsyncThunk<Trip, number, { rejectValue: string }>(
  'getTrip/fetchUserTrips',
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}/trips/${user_id}`);
      const data = await response.json();
      return data;  
    } catch (err) {
      return rejectWithValue('this is an error');  
    }
  }
);
