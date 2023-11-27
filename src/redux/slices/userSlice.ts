import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    userData: {},
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userData = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

// define actions
export const {} = actions;

export default reducer;
