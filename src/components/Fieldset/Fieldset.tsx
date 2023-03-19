import { TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { StyledFieldsetWrapper } from "./Fieldset.styles";
import { FieldsetProps } from "./Fieldset.types";

export const Fieldset = <T extends FieldValues,>({
  isFullWidth,
  inputWidth,
  name,
  required,
  control,
  rules,
  label,
  render,
  type,
  isMultiline,
}: FieldsetProps<T>) => {
  return (
    <StyledFieldsetWrapper isFullWidth={isFullWidth} inputWidth={inputWidth}>
      <Controller
        control={control}
        rules={{ required, ...rules }}
        name={name}
        render={
          render
            ? render
            : ({ field, fieldState }) => (
                <TextField
                  {...field}
                  type={type}
                  label={label}
                  multiline={isMultiline}
                  helperText={fieldState.error?.message || " "}
                  error={!!fieldState.error}
                />
              )
        }
      ></Controller>
    </StyledFieldsetWrapper>
  );
};
