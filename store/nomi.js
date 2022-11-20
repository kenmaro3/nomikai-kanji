import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  location: [],
  date: [],
  passcode: null,
  deadline: null,
  host_id: null,
};

export const nomiSlice = createSlice({
  name: "nomi",
  initialState,
  // HACK: reducerは肥大化したらファイル分けたくなるかも
  reducers: {
    setName(state, action) {
      state.name = action.payload.name
    },
    setDate(state, action) {
      state.date = action.payload.date
    },
    setLocation(state, action) {
      state.location = action.payload.location
    },
    setPasscode(state, action) {
      state.passcode = action.payload.passcode
    },
    setDeadline(state, action) {
      state.deadline = action.payload.deadline
    },
    setHostId(state, action) {
      state.host_id = action.payload
    },
    // addHistory(state, action) {
    //   state.user.history.push(action.payload)
    // },
    reset() {
      return initialState;
    },
  },
});
