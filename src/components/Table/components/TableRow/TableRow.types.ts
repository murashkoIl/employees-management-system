export type TableRowProps = {
  redirectButtonText: string;
  deleteButtonText: string;
  onDelete: (id: string) => void;
  children?: React.ReactNode;
  id: string;
};
