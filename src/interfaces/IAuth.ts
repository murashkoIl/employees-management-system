import { User } from "./user.interface";

export interface IResetPassword {
  email: string;
}

export interface ISignIn extends IResetPassword {
  password: string;
}

export interface ISignUp extends ISignIn {
  passwordConfirmation: string;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IUserInfo {
  user: User;
}
