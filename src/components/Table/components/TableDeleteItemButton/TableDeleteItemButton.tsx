import { Button } from "@mui/material";
import { withAdminAccess } from "@hoc/withAdminAccess";
import { TableDeleteItemButtonProps } from "./TableDeleteItemButton.types";

export const TableDeleteItemButton = ({
  handleDelete,
  deleteButtonText,
}: TableDeleteItemButtonProps) => {
  return <Button onClick={handleDelete}>{deleteButtonText}</Button>;
};

export const DeleteWithAdminAccessButton = withAdminAccess(
  TableDeleteItemButton,
);
