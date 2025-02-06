import { Dialog, DialogTitle } from "@mui/material";
import React, { ReactNode } from "react";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ title, children, onClose }: ModalProps) => (
  <Dialog onClose={onClose} open={true}>
    <DialogTitle>{title}</DialogTitle>
    {children}
  </Dialog>
);
