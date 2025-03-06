import MyLocationIcon from "@mui/icons-material/MyLocation";
import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

import { LocalModel } from "@/models";
import { setCenter, setSelectedMapWaypoint } from "@/store/slices/mapSlice";

export const Navigation = ({ route }: { route: LocalModel }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLocation = (route: LocalModel) => {
    const { x, y } = route;
    router.push("/");
    setTimeout(() => {
      dispatch(setSelectedMapWaypoint(route.symbol));
      dispatch(setCenter({ x, y }));
    }, 500);
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
