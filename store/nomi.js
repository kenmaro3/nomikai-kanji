import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  nomi: {
    name: null,
    station: null,
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
      state.nomi = action.payload;
    },
    // addHistory(state, action) {
    //   state.user.history.push(action.payload)
    // },
    reset() {
      return initialState;
    },
  },
});
