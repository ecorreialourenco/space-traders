import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, IconButton, Tooltip } from "@mui/material";
import React, { ReactNode } from "react";

interface ModalProps {
  title: string;
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ title, open, children, onClose }: ModalProps) => (
  <Dialog onClose={onClose} open={open}>
    <DialogTitle className="flex justify-between">
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
