import { styled } from "@mui/material";

export const StyledOverlayDiv = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  position: "fixed",
  zIndex: "2",
  top: "0",
  left: "0",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
});
