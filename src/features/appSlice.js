import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: "app",
  initialState : {
    channelId : null,
    channelName : null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setChannelInfo : (state , action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
  },
});

export const { setChannelInfo } = appSlice.actions;
export const selectChannelId= (state) => state.app.channelId;      // faced problem in this  selectChannelId -> channelId
export const selectChannelName= (state) => state.app.channelName;    // faced problem in this selectChannelName -> channelName


export default appSlice.reducer;
