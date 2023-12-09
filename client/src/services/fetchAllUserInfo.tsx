import { UserNoTrips } from '../types/User';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:3000';

export const fetchAllUserInfo = createAsyncThunk<UserNoTrips[]>(
  'getAllUserInfo/fetchAllUserInfo',
  async () => {
    try {
      const response = await fetch(`${url}/user/all`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
