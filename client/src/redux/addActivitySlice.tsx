import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Activity } from '../types/Activity';

const initialState: Activity[] = [];

export const addActivitySlice = createSlice({
  name: 'activities',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.push(action.payload);
    },
  },
});

export const { addActivity } = addActivitySlice.actions;

export default addActivitySlice.reducer;
