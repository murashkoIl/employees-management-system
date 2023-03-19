import { Button } from "@mui/material";
import { withAdminAccess } from "@src/hoc/withAdminAccess";
import { FormSaveButtonProps } from "./FormSaveButton.types";

export const FormSaveButton = ({ allowAccess }: FormSaveButtonProps) => {
  return (
    <Button type="submit" value="Save" variant="contained">
      Save
    </Button>
  );
};

export const SaveButtonWithAdminAccess = withAdminAccess(FormSaveButton);
