import { UserNoTrips } from '../types/User';
import { fetchAllUserInfo } from '../services/fetchAllUserInfo';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface UserInfoProp {
  userInformation: UserNoTrips[];
  status: 'idle' | 'loading' | 'failed';
  error: string;
}

const initialState = {
  userInformation: [
    {
      user_id: 0,
      first_name: '',
      last_name: '',
      display_name: '',
      display_pic_src: '',
      following: [0, 0],
      followers: [0, 0],
    },
  ],
  status: 'idle',
  error: '',
};

export const fetchAllUserInfoSlice = createSlice({
  name: 'getAllUserInfo',
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInformation = action.payload;
      })
      .addCase(fetchAllUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});



export default fetchAllUserInfoSlice.reducer;