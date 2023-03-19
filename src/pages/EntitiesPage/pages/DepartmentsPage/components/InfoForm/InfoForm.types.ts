import { Department } from "@interfaces/department.interface";
import { SubmitHandler } from "react-hook-form";

export type InfoFormProps = {
  onSubmit: SubmitHandler<Department>;
  onCancel: () => void;
  input?: Department;
};
