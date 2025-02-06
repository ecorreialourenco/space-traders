import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import mapReducer from "./slices/mapSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
