export const tableHead = [
  { columnKey: "name", columnName: "First Name", isSortable: true },
  { columnKey: "lastName", columnName: "Last Name", isSortable: true },
  { columnKey: "email", columnName: "Email", isSortable: false },
  { columnKey: "department", columnName: "Department", isSortable: false },
  {
    columnKey: "specialization",
    columnName: "Specialization",
    isSortable: true,
  },
];

export const mediumScreenTableHead = [
  { columnKey: "name", columnName: "First Name", isSortable: true },
  { columnKey: "lastName", columnName: "Last Name", isSortable: true },
  { columnKey: "department", columnName: "Department", isSortable: false },
];

export const smallScreenTableHead = [
  { columnKey: "lastName", columnName: "Last Name", isSortable: true },
  { columnKey: "department", columnName: "Department", isSortable: false },
];
