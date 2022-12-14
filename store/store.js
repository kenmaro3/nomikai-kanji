import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  EnhancedStore,
} from "@reduxjs/toolkit";
import { nomiSlice } from "./nomi";
import { userSlice } from "./user";
import { voteSlice } from "./vote";
import { planSlice } from "./plan";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// HACK: `redux-persist failed to create sync storage. falling back to noop storage.`の対応
// https://github.com/vercel/next.js/discussions/15687#discussioncomment-45319
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootReducer = combineReducers({
  nomi: nomiSlice.reducer,
  user: userSlice.reducer,
  plan: planSlice.reducer,
  vote: voteSlice.reducer,
});

//export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "p-next-test",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

//export const useStore = (): EnhancedStore => {
export const useStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
};
