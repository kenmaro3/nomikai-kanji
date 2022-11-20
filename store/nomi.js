import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  nomi: {
    name: null,
    stations: null,
    dates: null,
    host: null,
    password: null,
    history: [],
  },
};

export const nomiSlice = createSlice({
  name: "nomi",
  initialState,
  // HACK: reducerは肥大化したらファイル分けたくなるかも
  reducers: {
    updateNomi(state, action) {
      //state.nomi = { ...state.nomi, action };
      console.log("this is payload", action.payload);
      state.nomi = { ...action.payload };
      console.log("this is state after", state);
    },
    // addHistory(state, action) {
    //   state.user.history.push(action.payload)
    // },
    reset() {
      return initialState;
    },
  },
});
