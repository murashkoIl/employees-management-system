import {
  Control,
  ControllerProps,
  FieldValues,
  Path,
  UseControllerProps,
} from "react-hook-form";

export type FieldsetProps<T extends FieldValues> = {
  isFullWidth?: boolean;
  inputWidth?: string;
  required?: string;
  label: string;
  type?: string;
  control: Control<T>;
  name: Path<T>;
  rules?: UseControllerProps<T>["rules"];
  render?: ControllerProps<T>["render"];
  isMultiline?: boolean;
};
