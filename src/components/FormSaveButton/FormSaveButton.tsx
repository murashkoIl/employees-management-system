import { Button } from "@mui/material";
import { withAdminAccess } from "@src/hoc/withAdminAccess";
import { useTranslation } from "react-i18next";

export const FormSaveButton = () => {
  const { t } = useTranslation();
  return (
    <Button type="submit" value="Save" variant="contained">
      {t("buttons.save")}
    </Button>
  );
};

export const SaveButtonWithAdminAccess = withAdminAccess(FormSaveButton);
