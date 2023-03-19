import { styled } from "@mui/material";

export const WrapperDiv = styled("div")({
  position: "relative",
  display: "flex",
  width: "100%",
  height: "100%",
  justifyContent: "space-between",
  "& .sidebar": {
    marginRight: "0.5em",
  },
  "& div.active > div > a": {
    color: "#1890FF",
    borderBottom: "2px solid #1890FF",
    padding: "0 0.5em 0.5em 0.5em",
  },
});

export const StyledButtonWrapper = styled("div")({
  background: "#fff",
  display: "flex",
  justifyContent: "flex-end",
  "& button": {
    backgroundColor: "#F0F0F0",
  },
});
