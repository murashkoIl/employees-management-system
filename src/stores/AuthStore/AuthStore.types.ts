import { AuthUserInfo } from "@graphql/Auth/Auth.interface";
import { User } from "@interfaces/user.interface";

export interface IAuthStore {
  user$: User | null;
  login: (userData: AuthUserInfo, isMemorized: boolean) => void;
  logout: () => void;
}

export interface IAuthContextProps {
  children?: React.ReactNode;
}
