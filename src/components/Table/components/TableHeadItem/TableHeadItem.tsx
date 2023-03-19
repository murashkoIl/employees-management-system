import { FilterList } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { TableHeadItemProps } from "./TableHeadItem.types";

export const TableHeadItem = ({
  isSortedBy,
  onClick,
  name,
  itemName,
  xs,
  isSortable,
  sortAsc,
}: TableHeadItemProps) => {
  const handleFilter: React.MouseEventHandler = (e) => {
    onClick(itemName);
  };
  return (
    <Grid item xs={xs} container justifyContent="center" alignItems="center">
      <Typography textAlign="center">{name}</Typography>
      {isSortable && (
        <FilterList
          className={isSortedBy && sortAsc ? "active" : ""}
          onClick={handleFilter}
        />
      )}
    </Grid>
  );
};
