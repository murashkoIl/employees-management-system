import { Grid } from "@mui/material";
import { StyledTypography } from "./TableRowItem.styles";
import { TableRowItemProps } from "./TableRowItem.types";

export const TableRowItem = ({ value, gridXS }: TableRowItemProps) => {  
  return (
    <Grid item xs={gridXS}>
      <StyledTypography>{value}</StyledTypography>
    </Grid>
  );
};
