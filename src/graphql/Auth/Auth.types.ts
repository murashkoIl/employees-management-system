import { User } from "@interfaces/user.interface";

export type AuthInput = {
  email: string;
  password: string;
};

export type AuthResult = {
  user: User;
  access_token: string;
};

export type LoginResult = {
  login: AuthResult;
};

export type SignupResult = {
  signup: AuthResult;
};
