import { User } from "@interfaces/user.interface";
import { getUserInfoFromLocalStorage } from "./localStorage";

export type GuardFunction = (user: User | null) => boolean;
export type RoleGuardWithUser = (roles: string[]) => GuardFunction;

export const authGuard: GuardFunction = (user) => {
  const token = getUserInfoFromLocalStorage();

  if (token) {
    const decodedJwt = parseJwt(token.access_token);

    if (decodedJwt.exp * 1000 < Date.now()) {
      return false;
    }
  }

  return !!user?.profile;
};

export const authFormsGuard: GuardFunction = (user) => {
  return !user?.profile;
};

export const roleGuard: RoleGuardWithUser = (roles) => {
  return (user) => {
    return roles.every((role) => user?.role?.includes(role));
  };
};

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.log(e);
    return null;
  }
}
