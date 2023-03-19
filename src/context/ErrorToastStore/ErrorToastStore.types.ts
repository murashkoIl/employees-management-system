import React from "react";

export type ErrorToastContextType = {
  setToastError: (message: string) => void;
};

export type ErrorToastStoreProps = {
  children?: React.ReactNode;
};
