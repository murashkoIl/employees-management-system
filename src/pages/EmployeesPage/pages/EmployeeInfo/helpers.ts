import { IEmployeeInfo } from "@interfaces/IEmployee";
import { CreateUserInput } from "@src/graphql/User/User.interface";
import { User } from "@src/interfaces/user.interface";

export function getEmployeeInfo<T extends User | undefined>(
  user: T,
): undefined | IEmployeeInfo {
  if (!user) return user;

  return {
    name: user?.profile.first_name || "Unknown",
    lastName: user?.profile.last_name || "Unknown",
    email: user?.email,
    departmentId: user?.department?.id || "Unknown",
    specialization: user?.position_name || "Unknown",
    id: user?.id,
  };
}

export const resetEmployee = (user: User) => {
  return {
    user: {
      departmentId: user?.department?.id || "",
      positionId: user?.position?.id || "",
      profile: {
        first_name: user?.profile.first_name || "",
        last_name: user?.profile.last_name || "",
        skills: user?.profile.skills,
        languages: user?.profile.languages,
      },
      cvsIds: user?.cvs.map((cv) => cv.id),
    },
  };
};
