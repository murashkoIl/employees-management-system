import { Button, styled } from "@mui/material";

export const Img = styled("img")({
  width: "70%",
  height: "65%",
  "@media(max-width: 510px)": {
    width: "90%",
    height: "55%",
  },
});

export const Wrapper = styled("div")({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const StyledButton = styled(Button)({
  color: "#000",
  borderColor: "#000",
  "&:hover": {
    color: "#000",
    borderColor: "#000",
  },
});
