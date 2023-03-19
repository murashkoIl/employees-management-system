import { GetUsersResult } from "@graphql/User/User.interface";
import { GET_USERS } from "@graphql/User/User.queries";
import { CacheUpdaterFunction } from "src/types";
import { AuthInputData, AuthSignupOutputData } from "./Auth.interface";

export const createUserCacheUpdate =
  (): CacheUpdaterFunction<AuthSignupOutputData, AuthInputData> =>
  (cache, { data }) => {
    const existingUsers = cache.readQuery<GetUsersResult>({
      query: GET_USERS,
    });

    if (existingUsers) {
      cache.writeQuery({
        query: GET_USERS,
        data: {
          users: [{ ...data?.signup.user }, ...existingUsers.users],
        },
      });
    }
  };
