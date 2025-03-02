import React from "react";
import { Button, Typography } from "@mui/material";
import styles from "./TitleButton.module.css";

interface TitleButtonProps {
  title: string;
  btnText: string;
  hideButton?: boolean;
  onClick: () => void;
}

export const TitleButton = ({
  title,
  btnText,
  hideButton,
  onClick,
}: TitleButtonProps) => {
  return (
    <>
      <Typography variant="h3" style={{ textAlign: "center" }}>
        {title}
      </Typography>
      {!hideButton && (
        <Button className={styles.button} onClick={onClick}>
          {btnText}
        </Button>
      )}
    </>
  );
};
