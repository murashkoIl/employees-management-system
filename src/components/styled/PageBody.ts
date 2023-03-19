import { styled } from "@mui/system";

export const PageBody = styled("div")({
  margin: "24px",
  marginBottom: "0",
  width: "calc(100% - 48px)",
  height: "calc(100vh - 16.5em)",
  overflow: "auto",
  background: "#fff",
  padding: "24px",
  "@media(max-width: 540px)": {
    width: "calc(100% - 24px)",
    margin: "12px",
    padding: "12px",
  },
});

export const LinksPageBody = styled("div")({
  margin: "24px",
  marginBottom: "-24px",
  width: "calc(100% - 48px)",
  background: "#fff",
});
