import { User } from "@interfaces/user.interface";
import { AuthInput } from "../Auth/Auth.types";
import { ProfileInput } from "@interfaces/profile.interface";
import { DeleteInput, DeleteResult } from "../delete.types";

export type GetUserResult = {
  user: User;
};

export type GetAccountInfoResult = {
  user: {
    id: string;
    email: string;
    profile: Pick<User["profile"], "full_name" | "avatar" | "id">;
  };
};

export interface GetUserFullnameResult {
  user: {
    id: string;
    profile: Pick<User["profile"], "first_name" | "last_name">;
  };
}

export type GetUsersResult = {
  users: User[];
};

export type CreateUserInput = {
  user: {
    auth: AuthInput;
    profile: ProfileInput;
    cvsIds: string[];
    departmentId: string;
    positionId: string;
  };
};

export type CreateUserResult = {
  createUser: {
    user: User;
  };
};

export type UpdateUserInput = {
  id: string;
  user: {
    profile: ProfileInput;
    cvsIds: string[];
    departmentId: string;
    positionId: string;
  };
};

export type UpdateUserResult = {
  updateUser: {
    user: User;
  };
};

export type DeleteUserInput = DeleteInput;

export type DeleteUserResult = {
  deleteUser: DeleteResult;
};
