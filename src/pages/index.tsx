import NavigateBefore from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";

import { SpaceMap } from "@/components";
import { Legend } from "@/components/SpaceMap/components";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="flex flex-row">
        <div
          className="absolute w-3xs z-10"
          style={{
            backgroundColor: isOpen ? "rgba(255, 255, 255, 0.1)" : "initial",
          }}
        >
          <Tooltip title={isOpen ? "Collapse Legend" : "Expand Legend"}>
            <IconButton
              className="text-white justify-end"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <NavigateBefore /> : <NavigateNextIcon />}
            </IconButton>
          </Tooltip>
          {isOpen && <Legend />}
        </div>
        <div className="flex flex-col h-full justify-center items-center">
          <SpaceMap />
        </div>
      </div>
    </div>
  );
}
