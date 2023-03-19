import { useLocation, Link } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";

import { BreadcrumbProps } from "./Breadcrumb.types";

export const Breadcrumb = ({ config = {} }: BreadcrumbProps) => {
  const { pathname } = useLocation();

  const pathnames = pathname.split("/");

  const isLast = (idx: number) => {
    return idx === pathnames.length - 1;
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.map((pathname, index) => {
        const routeTo = `${pathnames.slice(0, index + 1).join("/")}`;

        const configItem = config[pathname] || pathname;

        return isLast(index) ? (
          <Typography key={pathname}> {configItem} /</Typography>
        ) : (
          <Link key={pathname} to={routeTo}>
            {configItem}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
