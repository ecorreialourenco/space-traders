import { SpaceMap } from "@/components";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { Legend } from "@/components/SpaceMap/components";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log("🚀 ~ Home ~ isOpen:", isOpen);

  return (
    <div>
      <div className="flex flex-row">
        <div
          className="w-full"
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
