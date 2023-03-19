import { ErrorToast } from "@components/ErrorToast";
import React, { useCallback, useContext, useState } from "react";
import {
  ErrorToastContextType,
  ErrorToastStoreProps,
} from "./ErrorToastStore.types";

const ErrorToastContext = React.createContext<ErrorToastContextType>(
  {} as ErrorToastContextType,
);

export const useErrorToast = () => {
  return useContext(ErrorToastContext);
};

export const ErrorToastStore = ({ children }: ErrorToastStoreProps) => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleSetError = useCallback((message: string) => {
    setErrors((prev) => [...prev, message]);
  }, []);

  return (
    <ErrorToastContext.Provider
      value={{
        setToastError: handleSetError,
      }}
    >
      {errors.map((error) => (
        <ErrorToast message={error} key={error} />
      ))}
      {children}
    </ErrorToastContext.Provider>
  );
};
