import React from "react";
import { DynamicArrayFieldProps } from "./components/DynamicArrayField/DynamicArrayField.types";

export type DynamicFieldsetProps<T extends string> = {
  onNew: (entryName: string) => void;
  children?: React.ReactElement<DynamicArrayFieldProps<T>>[];
  inputEntries: InputGenericEntry<T>[];
  fieldForValue: keyof InputGenericEntry<T>;
};

export type GenericEntry<T> = {
  entryName: T;
  possibleValues: Record<string, string>;
};

export type InputGenericEntry<T> = {
  entryName: T;
  id: string;
};
