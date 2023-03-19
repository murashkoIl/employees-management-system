import { createContext, useRef, useState } from "react";
import { ISidebarContext, SidebarProviderProps } from "./sidebarContext.types";

const SidebarContext = createContext({} as ISidebarContext);

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const burgerMenuRef = useRef<HTMLInputElement>(null);

  const handleMenuBurgerClick = () => {
    sidebarRef.current?.classList.toggle("show");
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpened,
        sidebarRef,
        burgerMenuRef,
        handleMenuBurgerClick,
        setIsSidebarOpened,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
