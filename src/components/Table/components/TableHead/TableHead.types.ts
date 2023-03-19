import { TableHead } from "../../Table.types";

export type TableHeadProps = {
  columns: TableHead;
  sortBy: string;
  sortAsc: boolean;
  onSortByChange: (columnName: string) => void;
  gridXS: number;
};
