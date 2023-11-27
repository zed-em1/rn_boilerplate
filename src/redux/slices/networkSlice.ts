import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const networkSlice = createSlice({
  name: 'network',
  initialState: {
    netState: false,
  },
  reducers: {
    setNetworkState: (state, action) => {
      state.netState = action.payload;
    },
  },
});

const { actions, reducer } = networkSlice;

// define actions
export const { setNetworkState } = actions;

export default reducer;
