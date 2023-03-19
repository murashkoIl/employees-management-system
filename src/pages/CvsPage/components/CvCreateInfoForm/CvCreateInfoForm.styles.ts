import { styled, TextField } from "@mui/material";

export const FormContolLabelWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginRight: "2em",
});

export const FormContolSelectLabelWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "0.5em",
  margin: "-0.5em 0 1em 0",
  paddingRight: "3em",
});

export const SelectTextField = styled(TextField)({
  minWidth: "12rem",
  marginTop: "-1.5em",
});
