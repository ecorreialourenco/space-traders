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
    <div className="m-2">
      <FormControl variant="filled" className="w-full bg-white">
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={onChange}
          variant="filled"
          data-cy="dropdown"
        >
          {options.map((option: Option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              data-cy={`dropdown-option-${option.value.replaceAll(" ", "-")}`}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
