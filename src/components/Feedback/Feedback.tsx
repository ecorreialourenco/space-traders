import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";

interface FeedbackProps {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
}

export const Feedback = ({
  isOpen,
  message,
  severity,
  onClose,
}: FeedbackProps) => (
  <Snackbar
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    open={isOpen}
    autoHideDuration={6000}
    onClose={onClose}
  >
    <Alert severity={severity} sx={{ width: "100%" }} onClose={onClose}>
      {message}
    </Alert>
  </Snackbar>
);
