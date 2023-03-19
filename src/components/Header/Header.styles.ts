import { styled, Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const StyledHeader = styled("header")({
  position: "fixed",
  zIndex: "100",
  width: "100vw",
  backgroundColor: "#001529",
  height: "3em",
  paddingRight: "1rem",
});

export const Img = styled("img")({
  width: "7em",
  minHeight: "3em",
  "@media(max-width: 950px)": {
    "&": {
      marginLeft: "1em",
    },
  },
});

export const StyledGrid = styled(Grid)({
  padding: "0 1em",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const StyledMenuIcon = styled(MenuIcon)({
  display: "none",
  color: "#fff",
  cursor: "pointer",
  "@media(max-width: 950px)": {
    "&": {
      display: "block",
      position: "absolute",
      top: "0.55em",
      left: "0.5em",
      marginRight: "1em",
    },
  },
});

export const FlexWrapper = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
});

export const StyledLabel = styled("label")({
  display: "none",
  width: "30px",
  cursor: "pointer",
  "@media(max-width: 950px)": {
    display: "flex",
    flexDirection: "column",
    "& input[type=checkbox]": {
      display: "none",
    },
    "& input[type=checkbox]:checked ~ span:nth-of-type(1)": {
      transformOrigin: "bottom",
      transform: "rotatez(45deg) translate(4px, 0px)",
    },
    "& input[type=checkbox]:checked ~ span:nth-of-type(2)": {
      transformOrigin: "top",
      transform: "rotatez(-45deg)",
    },
    "& input[type=checkbox]:checked ~ span:nth-of-type(3)": {
      transformOorigin: "bottom",
      width: "50%",
      transform: "translate(14px,-3px) rotatez(45deg)",
    },
    "& span": {
      background: "#fff",
      borderRadius: "7px",
      height: "2px",
      margin: "3px 0",
      transition: ".4s  cubic-bezier(0.68, -0.6, 0.32, 1.6)",
      "&:nth-of-type(1)": {
        width: "50%",
      },
      "&:nth-of-type(2)": {
        width: "100%",
      },
      "&:nth-of-type(3)": {
        width: "75%",
      },
    },
  },
});
