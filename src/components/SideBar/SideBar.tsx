import { useContext } from "react";
import { StyledPaper } from "./SideBar.styles";
import { SideBarLink } from "./components/SideBarLink";
import { sideBarLinks, sideBarEntityLink } from "./SideBar.data";
import { SideBarLinkWithAdminAccess } from "./components/SideBarLink";
import { SidebarContext } from "@context/sidebarContext/sidebarContext";
import { useTranslation } from "react-i18next";

export function SideBar() {
  const { sidebarRef } = useContext(SidebarContext);
  const { t } = useTranslation();

  return (
    <StyledPaper ref={sidebarRef}>
      {sideBarLinks.map(({ to, name, Icon }) => (
        <SideBarLink
          to={to}
          name={t(`sidebar.${name}`)}
          icon={<Icon />}
          key={to}
        />
      ))}
      <SideBarLinkWithAdminAccess
        to={sideBarEntityLink.to}
        name={t(`sidebar.${sideBarEntityLink.name}`)}
        icon={<sideBarEntityLink.Icon />}
    />
    </StyledPaper>
  );
}
