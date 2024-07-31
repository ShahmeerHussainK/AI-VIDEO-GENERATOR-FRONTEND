import { createSlice } from '@reduxjs/toolkit';

const netInfoSlice = createSlice({
  name: 'internet',
  initialState: {
    isConnected: true,
  },
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setConnectionStatus } = netInfoSlice.actions;
export default netInfoSlice.reducer;
  