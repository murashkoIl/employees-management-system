import { User } from "@interfaces/user.interface";
import { createContext, useState } from "react";
import {
  CurrentUserProviderProps,
  ICurrentUserContext,
} from "./currentUserContext.types";

const CurrentUserContext = createContext({} as ICurrentUserContext);

const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserProvider };
