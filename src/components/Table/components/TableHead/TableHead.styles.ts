import { styled } from "@mui/system";
import { Grid } from "@mui/material";

export const StyledDiv = styled("div")({
  width: "100%",
  marginTop: "1em",
  display: "flex",
  backgroundColor: "#f9f9f9",
});

export const StyledGrid = styled(Grid)({
  display: "flex",
  padding: "1em 0",
  paddingLeft: "8px",
  borderRadius: "5px",
  background: "#FAFAFA",
  "& .MuiGrid-item": {
    justifyContent: "flex-start",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1em",
    margin: "0.1em 0 0 0.3em",
    transition: "transform 0.4s ease-in",
  },
  "& .MuiSvgIcon-root:hover": {
    cursor: "pointer",
  },
  "& > div": {
    padding: "0 0.5em",
  },
  "& .MuiSvgIcon-root.active": {
    transform: "rotate(-180deg)",
  },
  "& .MuiGrid-root": {
    paddingLeft: 0,
  },
});
