import { styled, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)({
  display: "flex",
  padding: "0.375em 0 0.365em 1em",
  color: "#000",
  "&.active": {
    color: "#1890FF",
  },
});

export const NavLinkTypography = styled(Typography)({
  paddingLeft: "0.5em",
});
