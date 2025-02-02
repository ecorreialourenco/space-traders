import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UiState {
  token: string;
}

// Define the initial state using that type
const initialState: UiState = {
  token: "",
};

export const uiSlice = createSlice({
  name: "ui",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = uiSlice.actions;

export default uiSlice.reducer;
