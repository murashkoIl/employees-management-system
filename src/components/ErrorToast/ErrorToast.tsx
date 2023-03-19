import { Alert, IconButton, Snackbar } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useState } from "react";
import { ErrorToastProps } from "./ErrorToast.types";

export const ErrorToast = ({ message }: ErrorToastProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {message.at(0)?.toUpperCase() + message.slice(1)}
      </Alert>
    </Snackbar>
  );
};
