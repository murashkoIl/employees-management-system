import { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { SideBar } from "../SideBar";
import { Content } from "./Layout.styles";
import { SidebarContext } from "@context/sidebarContext/sidebarContext";

export function Layout() {
  const { sidebarRef, burgerMenuRef, setIsSidebarOpened } =
    useContext(SidebarContext);
  const location = useLocation();

  useEffect(() => {
    sidebarRef.current?.classList.remove("show");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    burgerMenuRef.current!.checked = false;
  }, [burgerMenuRef, location, setIsSidebarOpened, sidebarRef]);

  return (
    <>
      <Header />
      <Content>
        <SideBar />
        <Outlet />
      </Content>
      <Footer />
    </>
  );
}
