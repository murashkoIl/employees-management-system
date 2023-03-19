import { useEffect, useState } from "react";
import { Breadcrumb } from "@components/Breadcrumb";
import { Box, Tabs, Tab } from "@mui/material";
import { Outlet, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { ROUTE } from "@constants/route";
import { PageTop } from "@components/styled/PageTop";
import { PageTopTypography } from "@components/PageTopTypography";
import { LinksPageBody, PageBody } from "@components/styled/PageBody";
import { useQuery } from "@apollo/client";
import { GET_USER_FULLNAME } from "@graphql/User/User.queries";
import { GetUserFullnameResult } from "@graphql/User/User.interface";
import { PageWrapper } from "@components/styled/PageWrapper";
import { validateUserFullName } from "../../helpers";
import { Loader } from "@components/Loader";
import { CurrentUserProvider } from "@context/currentUserContext/currentUserContext";

export const EmployeePage = () => {
  const { employeeId } = useParams();
  const { pathname } = useLocation();
  const pathnames = pathname.split("/");

  const { data, loading } = useQuery<GetUserFullnameResult>(GET_USER_FULLNAME, {
    variables: {
      id: employeeId,
    },
  });

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const [selectedTab, setSelectedTab] = useState<number>(
    pathnames.includes("cv") ? 1 : 0,
  );

  const displayedName = data ? validateUserFullName(data) : "";

  useEffect(() => {
    !pathnames.includes("cv") && setSelectedTab(0);
  }, [pathnames]);

  return loading ? (
    <Loader />
  ) : (
    <CurrentUserProvider>
      <PageWrapper>
        <PageTop>
          <Breadcrumb
            config={{
              info: "Info",
              cv: "CV",
              employees: "Employees",
              [employeeId!]: displayedName,
            }}
          />
          <PageTopTypography
            title="Employees"
            caption={displayedName + "'s profile"}
          />
        </PageTop>
        <LinksPageBody>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <Tab
                label="Info"
                component={Link}
                to={ROUTE.EMPLOYEES + "/" + employeeId}
              />
              <Tab label="CV" component={Link} to={"cv"} />
            </Tabs>
          </Box>
        </LinksPageBody>
        <PageBody>
          <Outlet />
        </PageBody>
      </PageWrapper>
    </CurrentUserProvider>
  );
};
