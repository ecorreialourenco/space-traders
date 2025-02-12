import { PointsModel, SimplePointModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapState {
  center: SimplePointModel;
  selectedPoint: PointsModel | null;
  waypoints: PointsModel[];
}

const initialState: MapState = {
  center: { x: 0, y: 0 },
  selectedPoint: null,
  waypoints: [],
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
    setWaypoints: (state, action: PayloadAction<PointsModel[]>) => {
      state.waypoints = action.payload;
    },
  },
});

export const { setCenter, setSelectedPoint, setWaypoints } = mapSlice.actions;

export default mapSlice.reducer;
