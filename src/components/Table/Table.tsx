import React, { useCallback, useState } from "react";
import { AbstractEntity, TableProps } from "./Table.types";
import { TableHead as TableHeadComponent } from "./components/TableHead";
import { TableRow as TableRowComponent } from "./components/TableRow";
import { StyledGrid } from "./Table.styles";
import { byColumn } from "./helpers/byColumn";
import { TableRowItem } from "./components/TableRowItem";
import { IEntryData } from "@interfaces/IEntryData";
import { SearchBox } from "@components/SearchBox";
import { ButtonWithAdminAccess } from "./components/TableEntryTypeButton";

export function createTable<T extends AbstractEntity>(): React.ComponentType<
  TableProps<T>
> {
  return Table;
}

export function Table({
  items,
  head,
  onDelete,
  onCreate,
  redirectButtonText,
  deleteButtonText,
  entryType,
  showNewEntryButton,
  searchBy,
}: TableProps) {
  const [sortBy, setSortBy] = useState(head[0].columnKey);
  const [isSortAsc, setIsSortAsc] = useState(true);

  const [filter, setFilter] = useState("");

  const handleSortByChange = useCallback(
    (columnName: string) => {
      if (columnName === sortBy) {
        setIsSortAsc((prev) => !prev);
      } else {
        setSortBy(columnName);
        setIsSortAsc(true);
      }
    },
    [sortBy],
  );

  const handleNew: React.MouseEventHandler = (e) => {
    onCreate && onCreate();
  };

  const handleQuery = (query: string) => {
    setFilter(query);
  };

  return (
    <StyledGrid container>
      {showNewEntryButton && (
        <ButtonWithAdminAccess handleNew={handleNew} entryType={entryType} />
      )}

      <SearchBox queryValue={filter} onQuery={handleQuery} />

      <TableHeadComponent
        columns={head}
        sortBy={sortBy}
        sortAsc={isSortAsc}
        onSortByChange={handleSortByChange}
        gridXS={12 / head.length}
      />
      {items
        .filter(
          filter
            ? (item) =>
                item[searchBy]
                  .toString()
                  .toLowerCase()
                  .includes(filter.toLowerCase())
            : (item) => item,
        )
        .sort(byColumn<IEntryData>(sortBy, isSortAsc))
        .map((item) => (
          <TableRowComponent
            redirectButtonText={redirectButtonText}
            deleteButtonText={deleteButtonText}
            onDelete={onDelete}
            key={item.id}
            id={item.id}
          >
            {head.map(({ columnKey }) => (
              <TableRowItem
                key={columnKey}
                value={item[columnKey]}
                gridXS={12 / head.length}
              />
            ))}
          </TableRowComponent>
        ))}
    </StyledGrid>
  );
}
