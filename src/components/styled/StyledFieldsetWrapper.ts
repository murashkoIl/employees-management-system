import { styled } from "@mui/material";

export const StyledFieldsetWrapper = styled("fieldset", {
  shouldForwardProp: (prop) => prop !== "isFullWidth" && prop !== "inputWidth",
})<{
  isFullWidth?: boolean;
  inputWidth?: string;
}>(({ isFullWidth, inputWidth = "320px" }) => ({
  marginBottom: "0.5em",
  padding: "0.25em 3em 0 0",
  display: "flex",
  flexFlow: "column",
  border: "none",
  "& .MuiFormLabel-asterisk": {
    color: "#d32f2f",
  },
  "& .MuiOutlinedInput-root": {
    minHeight: "56px",
    width: inputWidth,
  },
  width: isFullWidth ? "100%" : "unset",
}));
