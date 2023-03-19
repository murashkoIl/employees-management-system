import { Dispatch, RefObject, SetStateAction } from "react";

export type SidebarProviderProps = {
  children: React.ReactNode;
};

export interface ISidebarContext {
  isSidebarOpened: boolean;
  sidebarRef: RefObject<HTMLDivElement>;
  burgerMenuRef: RefObject<HTMLInputElement>;
  setIsSidebarOpened: Dispatch<SetStateAction<boolean>>;
  handleMenuBurgerClick: () => void;
}
