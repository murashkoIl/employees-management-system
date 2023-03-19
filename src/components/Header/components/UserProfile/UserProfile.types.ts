import { GetAccountInfoResult } from "@src/graphql/User/User.interface";

export type UserProfileContextType = {
  updateProfile: (field: "full_name" | "avatar" | "id", value: string) => void;
  user: null | GetAccountInfoResult["user"];
};
