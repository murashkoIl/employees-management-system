import { Typography } from "@mui/material";
import { StyledFooter } from "./Footer.styles";

type FooterProps = {
  footerText: string;
};

export function Footer({ footerText }: FooterProps) {
  return (
    <StyledFooter>
      <Typography variant="body1">{footerText}</Typography>
    </StyledFooter>
  );
}
