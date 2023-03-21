import { Button } from "@mui/material";
import { withAdminAccess } from "@hoc/withAdminAccess";
import { TableEntryTypeButtonProps } from "./TableEntryTypeButton.types";
import { useTranslation } from "react-i18next";

export const TableEntryTypeButton = ({
  handleNew,
  entryType,
}: TableEntryTypeButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button onClick={handleNew}>
      {t("table.newEntries.add")} {t(`table.newEntries.${entryType}`)}
    </Button>
  );
};

export const ButtonWithAdminAccess = withAdminAccess(TableEntryTypeButton);
