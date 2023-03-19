import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledDiv = styled("div")({
  width: "13.5rem",
  margin: "1em 0",
  "&.active": {
    borderBottom: "2px solid #1890FF",
    "& a, & div": {
      color: "#1890FF",
    },
  },
});

export const StyledLink = styled(Link)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#000",
  padding: "0 0.5em",
});

export const StyledEntry = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#000",
  padding: "0 0.5em",
  cursor: "pointer",
});
