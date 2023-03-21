import { StyledDialogActions } from "@components/styled/StyledDialogActions";
import { Fieldset } from "@components/Fieldset";
import { InfoFormWrapper } from "@components/styled/InfoFormWrapper";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Position } from "@interfaces/position.interface";
import { InfoFormProps } from "./InfoForm.types";
import { useTranslation } from "react-i18next";

export const InfoForm = ({ input, onSubmit, onCancel }: InfoFormProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<Position>({
    defaultValues: {
      name: input?.name,
    },
  });

  useEffect(() => {
    if (input) {
      const { name } = input;
      reset({ name });
    }
  }, [input, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InfoFormWrapper>
          <Fieldset
            control={control}
            required={t("fieldset.required") || ""}
            label="Name"
            name="name"
          />
        </InfoFormWrapper>

        <StyledDialogActions sx={{ marginRight: "1em" }}>
          <Button type="submit" value="Save" variant="contained">
            {t("buttons.save")}
          </Button>
          <Button
            onClick={onCancel}
            type="reset"
            value="Cancel"
            variant="outlined"
            color="info"
          >
            {t("buttons.cancel")}
          </Button>
        </StyledDialogActions>
      </form>
    </>
  );
};
