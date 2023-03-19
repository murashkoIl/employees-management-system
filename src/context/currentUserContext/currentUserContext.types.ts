import { User } from "@interfaces/user.interface";
import { Dispatch, SetStateAction } from "react";

export interface ICurrentUserContext {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
}

export type CurrentUserProviderProps = {
  children: React.ReactNode;
};
