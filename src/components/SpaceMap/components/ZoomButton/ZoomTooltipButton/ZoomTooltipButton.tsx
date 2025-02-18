import { IconButton, Tooltip } from "@mui/material";
import React, { ReactNode } from "react";

interface ZoomTooltipButtonProps {
  title: string;
  children: ReactNode;
  onClick: () => void;
}

export const ZoomTooltipButton = ({
  title,
  children,
  onClick,
}: ZoomTooltipButtonProps) => (
  <Tooltip placement="left" title={title}>
    <span>
      <IconButton onClick={onClick} edge="end">
        {children}
      </IconButton>
    </span>
  </Tooltip>
);
