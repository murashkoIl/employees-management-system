import { withAdminAccess } from "@hoc/withAdminAccess";
import { NavLinkTypography, StyledNavLink } from "./SideBarLink.styles";
import { SideBarLinkProps } from "./SideBarLink.types";

export function SideBarLink({ to, name, icon }: SideBarLinkProps) {
  return (
    <StyledNavLink to={to}>
      {icon}
      <NavLinkTypography>{name}</NavLinkTypography>
    </StyledNavLink>
  );
}

export const SideBarLinkWithAdminAccess = withAdminAccess(SideBarLink);
