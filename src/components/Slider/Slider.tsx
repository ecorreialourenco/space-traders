import React from "react";
import {
  Box,
  Card,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import styles from "./Slider.module.scss";

interface SliderList {
  id: string;
  title: string;
  description: string;
}

interface SliderProps {
  isLoading?: boolean;
  title: string;
  value: string;
  list: SliderList[];
  onSelect: (value: string) => void;
  goPrevious: () => void;
  goNext: () => void;
}

export const Slider = ({
  isLoading,
  title,
  value,
  list,
  onSelect,
  goPrevious,
  goNext,
}: SliderProps) => {
  const handleClassName = (id: string) => {
    if (value) {
      if (value === id) {
        return styles.selected;
      }
      return styles.notSelected;
    }

    return "";
  };

  return (
    <div className="flex">
      <IconButton aria-label="previous" onClick={goPrevious}>
        <ChevronLeft />
      </IconButton>

      <div>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          {title}
        </Typography>
        <div
          style={{
            width: 600,
            height: 400,
            overflow: "scroll",
            display: "flex",
          }}
        >
          {isLoading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            list.map((item) => (
              <Card
                key={item.id}
                className={handleClassName(item.id)}
                style={{ minWidth: 200, padding: "5px 10px" }}
                onClick={() => onSelect(item.id)}
              >
                <Typography
                  variant="h6"
                  style={{ minHeight: 64, alignContent: "center" }}
                >
                  {item.title}
                </Typography>
                <p>{item.description}</p>
              </Card>
            ))
          )}
        </div>
      </div>
      <IconButton aria-label="next" onClick={goNext}>
        <ChevronRight />
      </IconButton>
    </div>
  );
};
