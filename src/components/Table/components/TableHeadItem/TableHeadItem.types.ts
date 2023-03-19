export type TableHeadItemProps = {
  isSortedBy: boolean;
  sortAsc: boolean;
  onClick: (columnName: string) => void;
  name: string;
  itemName: string;
  xs: number;
  isSortable: boolean;
};
