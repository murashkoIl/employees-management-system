import React, { ChangeEvent, useContext } from "react";
import {
  StyledHeader,
  Img,
  StyledGrid,
  StyledLabel,
  FlexWrapper,
} from "./Header.styles";
import { UserProfile } from "./components/UserProfile";
import logo from "@assets/images/logo.svg";
import { SidebarContext } from "@context/sidebarContext/sidebarContext";

export function Header() {
  const { handleMenuBurgerClick, burgerMenuRef } = useContext(SidebarContext);

  const handleMenuClick = (e: ChangeEvent<HTMLInputElement>) => {
    handleMenuBurgerClick();
  };

  return (
    <StyledHeader>
      <StyledGrid>
        <FlexWrapper>
          <StyledLabel htmlFor="check">
            <input
              ref={burgerMenuRef}
              onChange={handleMenuClick}
              type="checkbox"
              id="check"
            />
            <span></span>
            <span></span>
            <span></span>
          </StyledLabel>
          <Img src={logo} alt="logo" />
        </FlexWrapper>
        <UserProfile />
      </StyledGrid>
    </StyledHeader>
  );
}
