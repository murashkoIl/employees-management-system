import { AuthUserInfoWithMemorizedValue } from "@graphql/Auth/Auth.interface";
import { AppLanguage } from "@src/stores/LanguageStore/LanguageStore.types";

export const isUserExists = () => {
  return localStorage.getItem("user");
};

export const getUserInfoFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : "";
};

export const deleteUserInfoFromLocalStorage = () => {
  return localStorage.removeItem("user");
};

export const setUserInfoToLocalStorage = (
  info: AuthUserInfoWithMemorizedValue,
) => {
  localStorage.setItem("user", JSON.stringify(info));
};

export const saveLanguageToLocalStorage = (language: AppLanguage) => {
  localStorage.setItem("language", language);
};

export const getLanguageFromLocalStorage = () => {
  return localStorage.getItem("language") as AppLanguage | null;
};
