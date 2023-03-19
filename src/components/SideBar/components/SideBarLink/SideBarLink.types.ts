import React from "react";
import { ISideBarLink } from "../../SideBar.types";

export type SideBarLinkProps = Pick<ISideBarLink, "to" | "name"> & {
  icon: React.ReactNode;
};
