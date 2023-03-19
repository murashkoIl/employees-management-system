export type DynamicArrayFieldProps<T extends string> = {
  onDelete: (name: T) => void;
  entryName: T;
};
