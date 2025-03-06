import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AgentModel } from "@/models";

interface UiState {
  agent: AgentModel | null;
  system: string;
}

const initialState: UiState = {
  agent: null,
  system: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAgent: (state, action: PayloadAction<AgentModel>) => {
      state.agent = action.payload;
    },
    setSystem: (state, action: PayloadAction<string>) => {
      state.system = action.payload;
    },
  },
});

export const { setAgent, setSystem } = uiSlice.actions;

export default uiSlice.reducer;
