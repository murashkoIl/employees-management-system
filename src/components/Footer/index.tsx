import { Typography } from "@mui/material";
import { StyledFooter } from "./Footer.styles";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <StyledFooter>
      <Typography variant="body1">{t("applicationDescription")}</Typography>
    </StyledFooter>
  );
}
