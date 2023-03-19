import { DynamicArrayFieldProps } from "../DynamicArrayField/DynamicArrayField.types";

export type DynamicArrayFieldWithSelectProps<T extends string> =
  DynamicArrayFieldProps<T> & {
    possibleValues: Record<string, string>;
    onChange: (name: string, newValue: string) => void;
    value: string;
  };
