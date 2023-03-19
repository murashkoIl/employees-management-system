import { DeleteResult } from "@graphql/delete.types";

export interface GetDepartmentsData {
  departments: Department[];
}

export interface UpdateDepartmentInput {
  id: string;
  department: Pick<Department, "name">;
}

export interface DeleteDepartmentOutput {
  deleteDepartment: DeleteResult;
}

export interface Department {
  name: string;
  id: string;
}

export interface UpdateDepartmentResult {
  updateDepartment: Department;
}

export interface CreateDepartmentInput {
  department: Pick<Department, "name">;
}

export interface CreateDepartmentOutput {
  createDepartment: {
    departments: Department;
    affected: number;
  };
}