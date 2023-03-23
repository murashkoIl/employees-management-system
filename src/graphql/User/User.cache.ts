import { CacheUpdaterFunction } from "src/types";
import {
  CreateUserInput,
  CreateUserResult,
  DeleteUserInput,
  DeleteUserResult,
  GetUsersResult,
  UpdateUserInput,
  UpdateUserResult,
} from "./User.interface";
import { GET_USERS } from "./User.queries";

export const deleteUserCacheUpdate =
  (id: string): CacheUpdaterFunction<DeleteUserResult, DeleteUserInput> =>
  (cache, { data }) => {
    const existingUsers = cache.readQuery<GetUsersResult>({ query: GET_USERS });

    if (existingUsers && data?.deleteUser.affected) {
      cache.writeQuery({
        query: GET_USERS,
        data: {
          users: existingUsers.users.filter((user) => user?.id !== id),
        },
      });
    }
  };

export const createUserCacheUpdate =
  (): CacheUpdaterFunction<CreateUserResult, CreateUserInput> =>
  (cache, { data }) => {
    const existingUsers = cache.readQuery<GetUsersResult>({
      query: GET_USERS,
    });

    if (existingUsers) {
      cache.writeQuery({
        query: GET_USERS,
        data: {
          users: [data?.createUser, ...existingUsers.users],
        },
      });
    }
  };

export const userCacheUpdate =
  (id: string): CacheUpdaterFunction<UpdateUserResult, UpdateUserInput> =>
  (cache, { data }) => {
    const existingUsers = cache.readQuery<GetUsersResult>({
      query: GET_USERS,
    });

    if (existingUsers) {
      cache.writeQuery({
        query: GET_USERS,
        data: {
          users: [
            ...existingUsers.users.filter((user) => user.id !== id),
            data?.updateUser,
          ],
        },
      });
    }
  };
