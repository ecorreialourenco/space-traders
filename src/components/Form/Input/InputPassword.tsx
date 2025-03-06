import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import cn from "classnames";
import React, { ChangeEvent, useState } from "react";

interface InputPasswordProps {
  label: string;
  value: string;
  className?: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const InputPassword = ({
  label,
  value,
  className,
  required,
  onChange,
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handlePassowrd = () => {
    setShowPassword((show) => !show);
  };

  return (
    <div className="m-2">
      <FormControl variant="filled" className="bg-white">
        <InputLabel>{label}</InputLabel>
        <FilledInput
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handlePassowrd}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          value={value}
          required={required}
          autoComplete={label.replaceAll(" ", "")}
          name={label.toLocaleLowerCase().replaceAll(" ", "_")}
          onChange={onChange}
          className={cn(
            "w-full bg-white hover:bg-white focus:bg-white",
            className
          )}
        />
      </FormControl>
    </div>
  );
};
