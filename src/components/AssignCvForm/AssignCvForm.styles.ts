import { styled } from "@mui/material";

export const StyledDiv = styled("div")({
  padding: "0.5em",
  margin: "0 1em",
  border: "1px solid #fff",
  cursor: "pointer",
  "&:hover": {
    border: "1px solid #000",
  },
});

export const StyledWrapper = styled("div")({
  marginTop: "2em",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  justifyContent: "flex-start",
  flexWrap: "wrap",
});
