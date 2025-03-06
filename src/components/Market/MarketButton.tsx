import { Button as MButton, TextField } from "@mui/material";
import React, { useState } from "react";

import { formatCredits } from "@/utils";

import { Button, Modal } from "..";

interface MarketButtonProps {
  price: number;
  maxValue: number;
  action: string;
  onClick: ({ units }: { units: number }) => void;
}

export const MarketButton = ({
  price,
  maxValue,
  action,
  onClick,
}: MarketButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  const handleChange = (val: number) => {
    if (val > maxValue) {
      setValue(maxValue);
    } else {
      setValue(val);
    }
  };

  return (
    <>
      <MButton
        className="w-full justify-start text-xs"
        variant="text"
        disabled={maxValue === 0}
        size="small"
        onClick={() => setIsOpen(true)}
      >
        {formatCredits(price)}
      </MButton>

      <Modal open={isOpen} title="Market" onClose={() => setIsOpen(false)}>
        <div className="m-2">
          <TextField
            label="Units"
            variant="filled"
            type="number"
            className="w-full px-2"
            onChange={(e) => handleChange(parseInt(e.target.value))}
            value={value}
            slotProps={{
              htmlInput: {
                min: 0,
                max: maxValue,
              },
            }}
          />

          <div className="flex justify-between">
            <div className="w-full">
              <Button
                label="Cancel"
                className="bg-gray-400 hover:bg-gray-600"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="w-full">
              <Button
                label={action.toUpperCase()}
                disabled={!value}
                onClick={() => {
                  onClick({ units: value });
                  setIsOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
