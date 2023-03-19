import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { SelectLabelWrapper } from "@src/components/styled/SelectLabel";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { SelectEntryProps } from "./SelectEntry.types";

export const SelectEntry = <T,>({
  entries,
  control,
  name,
  title,
}: SelectEntryProps<T>) => {
  return (
    <SelectLabelWrapper>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field: { name, onBlur, onChange, ref, value } }) => (
            <>
              <InputLabel id={name + "-label"}>{title}</InputLabel>
              <Select
                labelId={name + "-label"}
                label={title}
                sx={{ minWidth: "12em" }}
                id={title}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                ref={ref}
                value={value || ""}
              >
                {entries &&
                  entries.map((entry, index) => (
                    <MenuItem key={entry.id} value={entry.id}>
                      {entry.name || "Unknown"}
                    </MenuItem>
                  ))}
              </Select>
            </>
          )}
        />
      </FormControl>
    </SelectLabelWrapper>
  );
};
