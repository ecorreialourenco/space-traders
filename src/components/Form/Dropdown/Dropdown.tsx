import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface Option {
  value: string;
  name: string;
}

interface DropdownProps {
  value: string;
  label: string;
  options: Option[];
  onChange: (event: SelectChangeEvent) => void;
}

export const Dropdown = ({
  value,
  label,
  options,
  onChange,
}: DropdownProps) => {
  return (
    <FormControl
      variant="filled"
      className="w-full" /* sx={{ m: 1, minWidth: 120 }} */
    >
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={onChange} variant="filled">
        {options.map((option: Option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
