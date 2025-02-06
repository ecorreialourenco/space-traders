import { PointsModel, SimplePointModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapState {
  center: SimplePointModel;
  selectedPoint: PointsModel | null;
}

const initialState: MapState = {
  center: { x: 0, y: 0 },
  selectedPoint: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<SimplePointModel>) => {
      state.center = action.payload;
    },
    setSelectedPoint: (state, action: PayloadAction<PointsModel | null>) => {
      state.selectedPoint = action.payload;
    },
  },
});

export const { setCenter, setSelectedPoint } = mapSlice.actions;

export default mapSlice.reducer;
