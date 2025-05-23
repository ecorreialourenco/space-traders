import {
  Button as MButton,
  ButtonProps as ButtonOwnProps,
} from "@mui/material";
import cn from "classnames";
import React from "react";

interface ButtonProps extends ButtonOwnProps {
  label: string;
  className?: string;
  type?: HTMLButtonElement["type"];
}

export const Button = ({ label, className, ...rest }: ButtonProps) => (
  <div className="m-2">
    <MButton
      className={cn(
        "w-full h-14",
        {
          "bg-yellow-600 hover:bg-amber-600": !className,
        },
        className
      )}
      variant="contained"
      {...rest}
    >
      {label}
    </MButton>
  </div>
);
