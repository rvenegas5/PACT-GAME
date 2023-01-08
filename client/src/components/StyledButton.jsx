import React from "react";
import Button from "@mui/material/Button";
import { Theme } from "../config/Theme";

function StyledButton({ type = "contained", onClick, placeholder }) {
  const styleType = type === "contained" ? "primary" : "secondary";
  return (
    <Button
      sx={{ bgColor: `background.${styleType}` }}
      onClick={onClick}
      variant={type}
    >
      {placeholder}
    </Button>
  );
}

export { StyledButton };
