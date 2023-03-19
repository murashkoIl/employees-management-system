import { Typography } from "@mui/material";
import { PageTopTypographyProps } from "./PageTopTypography.types";

export const PageTopTypography = ({
  title,
  caption,
}: PageTopTypographyProps) => {
  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="caption">{caption}</Typography>
    </>
  );
};
