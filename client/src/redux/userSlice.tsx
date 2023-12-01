import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip } from '../types/Trip';

interface UserState {
  currentUser: null | number;
}

const initialState: UserState = {
    currentUser: null, 
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      setUser: (state, action: PayloadAction<number>) => {
        state.currentUser = action.payload;
      },
      clearUser: (state) => {
        state.currentUser = null;
      }
    },
  });
  
  export const { setUser, clearUser } = userSlice.actions;
  
  export default userSlice.reducer;