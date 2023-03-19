import { Fieldset } from "@components/Fieldset";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { FieldValues } from "react-hook-form";
import { DatePickerFieldsetProps } from "./DatePickerFieldset.types";

export const DatePickerFieldset = <T extends FieldValues>({
  control,
  name,
  label,
  required,
}: DatePickerFieldsetProps<T>) => {
  return (
    <Fieldset
      control={control}
      name={name}
      label={label}
      rules={{
        required,
        pattern: /^\d{2}\/\d{2}\/\d{4}$/g,
      }}
      render={({ field, fieldState }) => (
        <DatePicker
          {...field}
          label={label}
          minDate={new Date("1980-01-01")}
          maxDate={new Date("2099-01-01")}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              helperText={fieldState.error?.message || " "}
              error={!!fieldState.error}
            />
          )}
        />
      )}
    />
  );
};
