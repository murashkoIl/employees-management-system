import { StyledDialogActions } from "@components/styled/StyledDialogActions";
import { Fieldset } from "@components/Fieldset";
import { InfoFormWrapper } from "@components/styled/InfoFormWrapper";
import { useForm } from "react-hook-form";
import { InfoFormProps, SkillInput } from "./InfoForm.types";
import { useEffect } from "react";
import { Button } from "@mui/material";

export const InfoForm = ({ input, onSubmit, onCancel }: InfoFormProps) => {
  const { control, handleSubmit, reset } = useForm<SkillInput>({
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
            required="Please, specify the field"
            label="Name"
            name="name"
          />
        </InfoFormWrapper>

        <StyledDialogActions sx={{ marginRight: "1em" }}>
          <Button type="submit" value="Save" variant="contained">
            Save
          </Button>
          <Button
            onClick={onCancel}
            type="reset"
            value="Cancel"
            variant="outlined"
            color="info"
          >
            Cancel
          </Button>
        </StyledDialogActions>
      </form>
    </>
  );
};
