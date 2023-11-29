
// import { Trip } from '../types/Trip';
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TripFeed } from '../redux/fetchUserFeedSlice';



const url = 'http://localhost:3000';



export const fetchUserFeed = createAsyncThunk<TripFeed[]>(
  'getTrip/fetchUserTrips',
  async () => {
    try {
      // confirm with MR on the endpoint 
      const response = await fetch(`${url}/trip/all`);
      const data = await response.json();
      return data;  
    } catch (err) {
      console.log(err);  
    }
  }
);
