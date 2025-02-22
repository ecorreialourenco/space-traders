import { SearchMode } from "@/enums";
import { PointsModel, SimplePointModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapState {
  center: SimplePointModel;
  selectedPoint: PointsModel | null;
  selectedMapWaypoint: string;
  selectedPointType: SearchMode;
  waypoints: PointsModel[];
}

const initialState: MapState = {
  center: { x: 0, y: 0 },
  selectedPoint: null,
  selectedMapWaypoint: "",
  selectedPointType: SearchMode.Waypoint,
  waypoints: [],
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<SimplePointModel>) => {
      state.center = action.payload;
    },
    setSelectedMapWaypoint: (state, action: PayloadAction<string>) => {
      state.selectedMapWaypoint = action.payload;
      state.selectedPointType = SearchMode.Waypoint;
    },
    clearSelectedMapWaypoint: (state) => {
      state.selectedMapWaypoint = "";
      state.selectedPointType = SearchMode.Coordinates;
    },
    setSelectedPoint: (state, action: PayloadAction<PointsModel | null>) => {
      state.selectedPoint = action.payload;
    },
    setWaypoints: (state, action: PayloadAction<PointsModel[]>) => {
      state.waypoints = action.payload;
    },
  },
});

export const {
  setCenter,
  setSelectedMapWaypoint,
  clearSelectedMapWaypoint,
  setSelectedPoint,
  setWaypoints,
} = mapSlice.actions;

export default mapSlice.reducer;
