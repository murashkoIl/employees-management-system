import { TableEntry } from "@constants/table";

export type TableProps<T = Item> = {
  items: T[];
  head: TableHead;
  redirectButtonText: string;
  deleteButtonText: string;
  entryType: TableEntry;
  showNewEntryButton?: boolean;
  onDelete: (id: string) => void;
  onCreate?: () => void;
  searchBy: string;
};

export type TableHead = {
  columnKey: string;
  columnName: string;
  isSortable: boolean;
}[];

export type Item = {
  [key: string]: string | number;
} & AbstractEntity;

export type AbstractEntity = {
  id: string;
};
