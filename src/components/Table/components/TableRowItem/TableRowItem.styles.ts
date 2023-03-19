import { Grid, styled, Typography } from "@mui/material";
import { StyledGridProps } from "./TableRowItem.types";

export const StyledTypography = styled(Typography)({
  wordWrap: "break-word",
});

// TODO: delete later
// export const StyledGrid = styled(Grid)<StyledGridProps>(({ xs }) => ({
//   "@media(max-width: 1110px)": {
//     gridTemplateColumns: `repeat(${xs - 2}, 1fr)`,
//   },
// }));
