import { Paper, styled } from "@mui/material";

export const StyledPaper = styled(Paper)({
  minWidth: "13em",
  zIndex: "1",
  minHeight: "calc(100vh - 5em)",
  paddingTop: "1em",
  background: "#fff",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
  transition: "all 1s ease",
  transform: "translateX(0)",
  "&.show": {
    transform: "translateX(0)",
  },
  "@media(max-width: 1036px)": {
    "&": {
      minWidth: "10em",
    },
  },
  "@media(max-width: 950px)": {
    "&": {
      position: "absolute",
      top: "3em",
      left: 0,
      zIndex: "100",
      height: "100vh",
      transform: "translateX(-200px)",
    },
  },
});
