import { Control, FieldValues, Path } from "react-hook-form";

export type SelectEntryProps<T extends FieldValues> = {
  control: Control<T, object>;
  name: Path<T>;
  entries?: Entry[];
  title: string;
};

export type Entry = {
  id: string;
  name?: string;
};
