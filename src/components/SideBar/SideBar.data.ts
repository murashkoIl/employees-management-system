import { ISideBarLink } from "./SideBar.types";
import { ROUTE } from "@constants/route";

import DnsIcon from "@mui/icons-material/Dns";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FolderIcon from "@mui/icons-material/Folder";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import React from "react";

class SideBarLinkData implements ISideBarLink {
  constructor(
    public to: string,
    public name: string,
    public Icon: React.ComponentType,
  ) {}
}

export const sideBarLinks: ISideBarLink[] = [
  new SideBarLinkData(ROUTE.EMPLOYEES, "employees", EmojiPeopleIcon),
  new SideBarLinkData(ROUTE.PROJECTS, "projects", DnsIcon),
  new SideBarLinkData(ROUTE.CVS, "cvs", AutoStoriesIcon),
];

export const sideBarEntityLink: ISideBarLink = new SideBarLinkData(
  ROUTE.ENTITIES,
  "entities",
  FolderIcon,
);
