import { styled } from "@mui/material";

export const StyledDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "75vw",
  height: "70vh",
  backgroundColor: "transparent",
  "&.hidden": {
    display: "none",
  },
  "@media(max-width: 950px)": {
    "&": {
      // flexDirection: "column",
    }
  },
});

export const StyledPattern = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "0 10px"
});

export const Img = styled("img")({
  width: "30wh",
  height: "70vh",
});
