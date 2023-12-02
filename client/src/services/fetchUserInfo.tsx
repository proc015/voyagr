// router.get('/user/:id', c.getUserDetails);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';

const url = 'http://localhost:3000';

export const fetchUserInfo = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>('getUserInfo/fetchUserInfo', async (user_id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${url}/user/${user_id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return rejectWithValue('this is an error');
  }
});
