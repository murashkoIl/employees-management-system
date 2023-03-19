import { CacheUpdaterFunction } from "src/types";
import { DeleteEntityEntryInput } from "../Entity.interface";
import {
  CreateDepartmentInput,
  CreateDepartmentOutput,
  DeleteDepartmentOutput,
  GetDepartmentsData,
  UpdateDepartmentInput,
  UpdateDepartmentResult,
} from "./Department.interface";
import { GET_DEPARTMENTS } from "./Department.queries";

export const deleteDepartmentCacheUpdate =
  (
    id: string,
  ): CacheUpdaterFunction<DeleteDepartmentOutput, DeleteEntityEntryInput> =>
  (cache, { data }) => {
    const existingDepartments = cache.readQuery<GetDepartmentsData>({
      query: GET_DEPARTMENTS,
    });

    if (existingDepartments && data?.deleteDepartment.affected) {
      cache.writeQuery({
        query: GET_DEPARTMENTS,
        data: {
          departments: existingDepartments.departments.filter(
            (entry) => entry.id !== id,
          ),
        },
      });
    }
  };

export const createDepartmentCacheUpdate =
  (): CacheUpdaterFunction<CreateDepartmentOutput, CreateDepartmentInput> =>
  (cache, { data }) => {
    const existingDepartments = cache.readQuery<GetDepartmentsData>({
      query: GET_DEPARTMENTS,
    });

    if (existingDepartments) {
      cache.writeQuery({
        query: GET_DEPARTMENTS,
        data: {
          departments: [
            data?.createDepartment,
            ...existingDepartments.departments,
          ],
        },
      });
    }
  };

export const departmentCacheUpdate =
  (
    id: string,
  ): CacheUpdaterFunction<UpdateDepartmentResult, UpdateDepartmentInput> =>
  (cache, { data }) => {
    const existingDepartments = cache.readQuery<GetDepartmentsData>({
      query: GET_DEPARTMENTS,
    });

    if (existingDepartments) {
      cache.writeQuery({
        query: GET_DEPARTMENTS,
        data: {
          departments: [
            ...existingDepartments.departments.filter(
              (department) => department.id !== id,
            ),
            data?.updateDepartment,
          ],
        },
      });
    }
  };
