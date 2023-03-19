import { Add } from "@mui/icons-material";
import { MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { DynamicFieldsetProps } from "./DynamicFieldset.types";

export const DynamicFieldset = <T extends string>({
  onNew,
  inputEntries,
  children,
  fieldForValue,
}: DynamicFieldsetProps<T>) => {
  const handleSelectChange = (e: SelectChangeEvent<unknown>) => {
    onNew(e.target.value as T);
  };

  return (
    <Stack gap={3}>
      {children}
      <Select
        value=""
        renderValue={() => "Add new"}
        displayEmpty={true}
        IconComponent={Add}
        aria-label="Add new entry"
        onChange={handleSelectChange}
        disabled={!inputEntries.length}
        sx={{ width: "8em" }}
      >
        {inputEntries.map((inputEntry) => (
          <MenuItem
            value={inputEntry[fieldForValue]}
            key={inputEntry[fieldForValue]}
          >
            {inputEntry.entryName}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};
