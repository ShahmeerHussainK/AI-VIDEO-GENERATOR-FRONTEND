import { configureStore } from '@reduxjs/toolkit';
import internetReducer from './netInfoSlice';

const store = configureStore({
  reducer: {
    internet: internetReducer,
  },
});

export default store;
// import {
//   combineReducers,
//   configureStore,
//   getDefaultMiddleware,
// } from "@reduxjs/toolkit"

// import netInfoSlice from "./slices/userSlice"

// const reducers = combineReducers({
//   netInfoReducer: netInfoSlice,
// })


// export const store = configureStore({
//   reducer: reducers,

// })


