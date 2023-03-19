import { Button } from "@mui/material";
import { withAdminAccess } from "@hoc/withAdminAccess";
import { TableEntryTypeButtonProps } from "./TableEntryTypeButton.types";

export const TableEntryTypeButton = ({
  handleNew,
  entryType,
}: TableEntryTypeButtonProps) => {
  return <Button onClick={handleNew}>Add {entryType}</Button>;
};

export const ButtonWithAdminAccess = withAdminAccess(TableEntryTypeButton);
