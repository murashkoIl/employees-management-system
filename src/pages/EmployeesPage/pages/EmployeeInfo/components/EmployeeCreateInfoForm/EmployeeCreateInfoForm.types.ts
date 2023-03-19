import { IEmployeeCore } from "@interfaces/IEmployee";
import { PositionNamesIds } from "@src/graphql/Entity/Position/Position.interface";
import { Department } from "@src/graphql/Entity/Department/Department.interface";
import { SubmitHandler } from "react-hook-form";

export type EmployeeCreateInfoFormProps = {
  onSubmit: SubmitHandler<IEmployeeCore>;
  error?: string;
  positions?: PositionNamesIds[];
  departments?: Department[];
};
