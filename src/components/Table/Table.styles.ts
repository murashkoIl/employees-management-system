import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const StyledGrid = styled(Grid)({
  zIndex: "1",
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "1em",
  padding: "1em",
  borderRadius: "5px",
  "@media(max-width: 540px)": {
    padding: "0.5rem",
  },
  "& svg": {
    fontSize: "1em",
    margin: "0.5em 0 0 0.3em",
    transition: "transform 0.4s ease-in",
  },
  "& svg:hover": {
    cursor: "pointer",
  },
  "& > div": {
    padding: "0 0.5em",
  },
  "& svg.active": {
    transform: "rotate(-180deg)",
  },

  backgroundColor: "#fff",
  "& .MuiSvgIcon-root": {
    fontSize: "1em",
    transition: "transform 0.4s ease-in",
  },
  "& .MuiSvgIcon-root:hover": {
    cursor: "pointer",
  },
  "& .MuiSvgIcon-root.active": {
    transform: "rotate(-180deg)",
  },
  "& .MuiTypography-root": {
    padding: "0 0.5em",
    fontSize: "0.8rem",
    textAlign: "left",
  },
  "& .MuiButton-root ": {
    backgroundColor: "#1890FF",
    border: "none",
    margin: "0 0 1rem 1rem",

    borderRadius: "2px",
    color: "#fff",
    cursor: "pointer",
    textAlign: "right",
  },
  "& .MuiButton-root:hover": {
    background: "#1890FF",
  },
  "& .MuiAccordionSummary-gutters": {
    padding: "0 0 0 0.5rem",
  },
  "& .MuiAccordionDetails-root": {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 0 0.5em 0",
    "& a, button": {
      color: "#fff",
    },
  },
});

export const StyledDiv = styled("div")({
  height: "100%",
  borderLeft: "20px solid #f9f9f9",
  borderTop: "24px solid #f9f9f9",
  borderRight: "20px solid #f9f9f9",
  borderRadius: "5px",
  marginBottom: "1rem",
});
