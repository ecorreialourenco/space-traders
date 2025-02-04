import { AgentModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UiState {
  agent: AgentModel | null;
}

// Define the initial state using that type
const initialState: UiState = {
  agent: null,
};

export const uiSlice = createSlice({
  name: "ui",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAgent: (state, action: PayloadAction<AgentModel>) => {
      state.agent = action.payload;
    },
  },
});

export const { setAgent } = uiSlice.actions;

export default uiSlice.reducer;
