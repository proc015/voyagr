import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from '../services/fetchUserInfo';
import { User } from '../types/User';

interface UserInfoState {
  userInfo: User;
  status: 'idle' | 'loading' | 'failed';
  error: string;
}

const initialState = {
  userInfo: {
    user_id: 0,
    first_name: '',
    last_name: '',
    display_name: '',
    display_pic_src: '',
    following: [''],
    followers: [''],
    trips: [
      {
        trip_id: 0,
        trip_name: '',
        destination: '',
        start_date: '',
        dest_lat_lon: [0, 0],
        picture_src: '',
        published: false,
      },
    ],
  },
  status: 'idle',
  error: '',
};

const fetchUserInfoSlice = createSlice({
  name: 'getUserInfo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default fetchUserInfoSlice.reducer;
