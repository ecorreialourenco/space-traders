import { TextField } from "@mui/material";
import cn from "classnames";
import React, { ChangeEvent } from "react";

interface InputProps {
  label: string;
  value: string;
  className?: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Input = ({
  label,
  value,
  className,
  required,
  onChange,
}: InputProps) => (
  <div className="m-2">
    <TextField
      label={label}
      name={label.toLocaleLowerCase().replaceAll(" ", "_")}
      variant="filled"
      onChange={onChange}
      value={value}
      required={required}
      className={cn("w-full bg-white", className)}
    />
  </div>
);
