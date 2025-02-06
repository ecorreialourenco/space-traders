import { Dialog, DialogTitle } from "@mui/material";
import React, { ReactNode } from "react";

interface ModalProps {
  title: string;
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ title, open, children, onClose }: ModalProps) => (
  <Dialog onClose={onClose} open={open}>
    <DialogTitle>{title}</DialogTitle>
    {children}
  </Dialog>
);
