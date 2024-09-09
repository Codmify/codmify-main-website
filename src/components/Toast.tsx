"use client"
import { useState } from "react";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";

const Alert: any = React.forwardRef(function Alert(props, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export type ToastMessageType = {
  alert: "error" | "warning" | "info" | "success";
  message: string;
};

type SnackbarPropsHalf = {
  snackBarOpen: boolean;
  setSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alert: "error" | "warning" | "info" | "success";
  message: string;
};

type SnackbarProps = ToastMessageType & SnackbarPropsHalf;

export default function SnackbarComp({
  snackBarOpen,
  setSnackBarOpen,
  alert,
  message,
}: SnackbarProps) {
  const handleClose = (_event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert}
          sx={{
            width: "100%",
          }}
        >
          <Typography color={"white"} variant="subtitle2">
            {message}
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
}

export const useToast = () => {
  const [handleSnack, setHandleSnack] = useState<ToastMessageType>({
    alert: "info",
    message: "",
  });
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  type alertType = "error" | "warning" | "info" | "success";

  const handleMessage = (indicator: alertType, mssg: string) => {
    setSnackBarOpen(false);
    setHandleSnack(() => ({
      alert: indicator,
      message: mssg,
    }));
    setSnackBarOpen(true);
  };

  return { handleMessage, snackBarOpen, handleSnack, setSnackBarOpen };
};
