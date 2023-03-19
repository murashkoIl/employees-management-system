import { styled } from "@mui/material";

export const AuthWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "column",
  height: "100vh",
  padding: "0 0.5em",
});

export const AuthImg = styled("img")({
  width: "12em",
  minHeight: "5em",
  paddingBottom: "1em",
});

export const AuthFlexContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  width: "22em",
});

export const AuthStyledForm = styled("form")({
  width: "100%",
  paddingBottom: "0.5em",
  "& fieldset": {
    padding: "0",
  },
  "& button": {
    padding: "1em 0",
  },
});

export const AuthAdditionalInfoWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: "0.7em",
});

export const AuthLoaderWrapper = styled("div")({
  paddingTop: "50%",
});

export const InvalidInputError = styled("div")({
  color: "red"
})