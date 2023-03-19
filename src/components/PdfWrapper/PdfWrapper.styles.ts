import { styled } from "@mui/material";

export const StyledOverlayDiv = styled("div")({
  display: "flex",
  position: "fixed",
  top: "0",
  left: "0",
  zIndex: "1",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
});

export const StyledDiv = styled("div")({
  width: "61vw",
  height: "85%",
  borderRadius: "10px",
  "& > div": {
    marginTop: "0.5rem",
  },
});
