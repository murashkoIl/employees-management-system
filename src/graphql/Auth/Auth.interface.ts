import { User } from "@interfaces/user.interface";

export interface AuthInputData {
  auth: AuthInput;
}

export interface AuthSignupOutputData {
  signup: AuthUserInfo;
}

export interface AuthSigninOutputData {
  login: AuthUserInfo;
}

export interface AuthInput {
  email: string;
  password: string;
}

export interface AuthUserInfo {
  user: User;
  access_token: string;
}

export interface AuthUserInfoWithMemorizedValue extends AuthUserInfo {
  isMemorized: boolean;
}
