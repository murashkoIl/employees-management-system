import { AuthUserInfo } from "@src/graphql/Auth/Auth.interface";
import { User } from "@src/interfaces/user.interface";
import { action, makeObservable, observable } from "mobx";
import { IAuthStore } from "./AuthStore.types";
import {
  deleteUserInfoFromLocalStorage,
  getUserInfoFromLocalStorage,
  isUserExists,
  setUserInfoToLocalStorage,
} from "@helpers/localStorage";

export class AuthStore implements IAuthStore {
  user$: User | null = null;

  constructor() {
    this.restoreUser();

    makeObservable(this, {
      login: action.bound,
      logout: action.bound,
      user$: observable,
    });
  }

  login = (userData: AuthUserInfo, isMemorized: boolean) => {
    const { user, access_token } = userData;
    this.user$ = user;

    setUserInfoToLocalStorage({ user, access_token, isMemorized });
  };

  logout = () => {
    this.user$ = null;
    deleteUserInfoFromLocalStorage();
  };

  private restoreUser = () => {
    if (isUserExists()) {
      const { user, isMemorized } = getUserInfoFromLocalStorage();
      if (isMemorized) {
        this.user$ = user;
      } else {
        deleteUserInfoFromLocalStorage();
      }
    }
  };
}

export const authStore = new AuthStore();
