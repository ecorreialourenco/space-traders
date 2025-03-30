import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, IconButton, Tooltip } from "@mui/material";
import React, { ReactNode } from "react";

interface ModalProps {
  title: string;
  open: boolean;
  className?: string;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({
  title,
  open,
  className,
  children,
  onClose,
}: ModalProps) => (
  <Dialog onClose={onClose} open={open}>
    <DialogTitle className={`flex justify-between ${className}`}>
      {title}
      <Tooltip title="Close">
        <IconButton onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </DialogTitle>
    {children}
  </Dialog>
);
