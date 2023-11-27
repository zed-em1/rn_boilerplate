import { configureStore } from '@reduxjs/toolkit';
import Reducers from './slices';

const store = configureStore({
  reducer: Reducers,
});

export default store;
