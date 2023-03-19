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
  "& div.active a": {
    color: "#1890FF",
    borderBottom: "2px solid #1890FF",
    padding: "0 0.5em 0.5em 0.5em",
  },
  "@media(max-width: 760px)": {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export const StyledButtonWrapper = styled("div")({
  background: "#fff",
  display: "flex",
  justifyContent: "flex-start",
  paddingBottom: "1em",
  "& button": {
    backgroundColor: "#F0F0F0",
  },
});
