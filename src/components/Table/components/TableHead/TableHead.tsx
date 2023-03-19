import { StyledDiv, StyledGrid } from "./TableHead.styles";
import { ExpandMore } from "@mui/icons-material";
import { TableHeadItem } from "../TableHeadItem";
import { TableHeadProps } from "./TableHead.types";

export function TableHead({
  columns,
  sortBy,
  onSortByChange,
  sortAsc,
  gridXS,
}: TableHeadProps) {
  return (
    <StyledDiv>
      <StyledGrid container>
        {columns.map((col, i) => {
          const { columnKey, columnName } = col;

          return (
            <TableHeadItem
              isSortedBy={sortBy === columnKey}
              sortAsc={sortAsc}
              isSortable={col.isSortable}
              onClick={onSortByChange}
              name={columnName}
              itemName={columnKey}
              xs={gridXS}
              key={i}
            />
          );
        })}
      </StyledGrid>
      <ExpandMore sx={{ opacity: 0 }} />
    </StyledDiv>
  );
}
