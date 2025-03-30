import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";

interface FullfillProps {
  unitsRequired: number;
  unitsFulfilled: number;
  contractId: string;
  onFullfill: (contractId: string) => void;
}

export const Fullfill = ({
  unitsRequired,
  unitsFulfilled,
  contractId,
  onFullfill,
}: FullfillProps) => (
  <Tooltip title="Fullfill contract">
    <span>
      <IconButton
        disabled={unitsRequired !== unitsFulfilled}
        onClick={() => onFullfill(contractId)}
      >
        <AssignmentTurnedInIcon />
      </IconButton>
    </span>
  </Tooltip>
);
