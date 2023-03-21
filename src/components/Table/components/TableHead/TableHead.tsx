import { StyledDiv, StyledGrid } from "./TableHead.styles";
import { ExpandMore } from "@mui/icons-material";
import { TableHeadItem } from "../TableHeadItem";
import { TableHeadProps } from "./TableHead.types";
import { useTranslation } from "react-i18next";

export function TableHead({
  columns,
  sortBy,
  onSortByChange,
  sortAsc,
  gridXS,
}: TableHeadProps) {
  const { t } = useTranslation();
  return (
    <StyledDiv>
      <StyledGrid container>
        {columns.map((col, i) => {
          const { columnKey } = col;
          return (
            <TableHeadItem
              isSortedBy={sortBy === columnKey}
              sortAsc={sortAsc}
              isSortable={col.isSortable}
              onClick={onSortByChange}
              name={t(`table.tableHead.${columnKey}`)}
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
