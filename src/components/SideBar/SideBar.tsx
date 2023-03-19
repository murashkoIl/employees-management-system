import { useContext } from "react";
import { StyledPaper } from "./SideBar.styles";
import { SideBarLink } from "./components/SideBarLink";
import { sideBarLinks, sideBarEntityLink } from "./SideBar.data";
import { SideBarLinkWithAdminAccess } from "./components/SideBarLink";
import { SidebarContext } from "@context/sidebarContext/sidebarContext";

export function SideBar() {
  const { sidebarRef } = useContext(SidebarContext);

  return (
    <StyledPaper ref={sidebarRef}>
      {sideBarLinks.map(({ to, name, Icon }) => (
        <SideBarLink to={to} name={name} icon={<Icon />} key={to} />
      ))}
      <SideBarLinkWithAdminAccess
        to={sideBarEntityLink.to}
        name={sideBarEntityLink.name}
        icon={<sideBarEntityLink.Icon />}
      />
    </StyledPaper>
  );
}
