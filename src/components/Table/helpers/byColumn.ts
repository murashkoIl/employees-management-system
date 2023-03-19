export function byColumn<T>(column: keyof T, sortAsc: boolean) {
  if (sortAsc) {
    return (a: T, b: T) => (a[column] < b[column] ? -1 : 1);
  }

  return (a: T, b: T) => (b[column] < a[column] ? -1 : 1);
}
