import { RouteModel } from "@/models/ship.model";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCenter } from "@/store/slices/mapSlice";

export const Navigation = ({ route }: { route: RouteModel }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLocation = (route: RouteModel) => {
    const { x, y } = route.destination;
    router.push("/");
    setTimeout(() => dispatch(setCenter({ x, y })), 500);
  };

  return (
    <Tooltip title="Go to location">
      <span>
        <IconButton onClick={() => handleLocation(route)}>
          <MyLocationIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};
