import { Profile } from "../interfaces/profile.interface";
import { Cv } from "./cv.interface";
import { Department } from "../interfaces/department.interface";
import { Position } from "../interfaces/position.interface";
import { UserRoles } from "@constants/user-roles.constants";

export interface User {
  id: string;
  email: string;
  profile: Profile;
  cvs: Cv[];
  department?: Department;
  department_name?: string;
  position?: Position;
  position_name?: string;
  role: UserRoles;
}
