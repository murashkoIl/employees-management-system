import { IEmployeeTable } from "@interfaces/IEmployee";
import { GetUserFullnameResult } from "@graphql/User/User.interface";
import { User } from "@src/interfaces/user.interface";

export function getEmployees(users: User[]): IEmployeeTable[] {
  return users.map((user) => ({
    id: user?.id,
    name: user?.profile.first_name || "Unknown",
    lastName: user?.profile.last_name || "Unknown",
    email: user?.email,
    department: user?.department?.name || "Unknown",
    specialization: user?.position_name || "Unknown",
  }));
}

export const validateUserFullName = ({ user }: GetUserFullnameResult) => {
  return user?.profile.first_name !== null && user?.profile.last_name !== null
    ? user?.profile.first_name + " " + user?.profile.last_name
    : "Unknown";
};
