import { AgentModel, SimplePointModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  agent: AgentModel | null;
  systems: string;
  mapCenter: SimplePointModel;
}

const initialState: UiState = {
  agent: null,
  systems: "",
  mapCenter: { x: 0, y: 0 },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAgent: (state, action: PayloadAction<AgentModel>) => {
      state.agent = action.payload;
    },
    setSystems: (state, action: PayloadAction<string>) => {
      state.systems = action.payload;
    },
    setMapCenter: (state, action: PayloadAction<SimplePointModel>) => {
      state.mapCenter = action.payload;
    },
  },
});

export const { setAgent, setSystems, setMapCenter } = uiSlice.actions;

export default uiSlice.reducer;
