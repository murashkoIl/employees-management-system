import { useContext, useState } from "react";
import {
  AuthFlexContainer,
  AuthWrapper,
} from "@components/styled/auth-styles/Auth.styles";
import { ROUTE } from "@constants/route";
import { Tab } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { StyledTabs } from "./Auth.styles";

export const Auth = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = () => {
    currentTab === 0 ? setCurrentTab(1) : setCurrentTab(0);
  };

  return (
    <>
      <AuthWrapper>
        <StyledTabs onChange={handleTabChange} value={currentTab}>
          <Tab label="Sign In" component={Link} to={ROUTE.SIGN_IN} />
          <Tab label="Sign Up" component={Link} to={ROUTE.SIGN_UP} />
        </StyledTabs>
        <AuthFlexContainer>
          <Outlet />
        </AuthFlexContainer>
      </AuthWrapper>
    </>
  );
};
