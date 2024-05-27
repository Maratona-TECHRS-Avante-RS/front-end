import { forwardRef } from "react";
import "./index.css";
import TextField from "@mui/material/TextField";

function InputComponent({ label, ...props }, ref) {
  return (
    <TextField
      sx={{ width: "100%", maxWidth: 500 }}
      variant="outlined"
      label={label}
      ref={ref}
      {...props}
    />
  );
}

export const Input = forwardRef(InputComponent);
