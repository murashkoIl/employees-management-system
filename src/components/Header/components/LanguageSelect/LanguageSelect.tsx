import React, { MouseEvent, SyntheticEvent, useState } from "react";
import { StyledTranslateIcon } from "./LanguageSelect.styles";
import { LanguageSelector } from "../LanguageSelector";

export const LanguageSelect = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (
    e: MouseEvent<SVGSVGElement> & SyntheticEvent<HTMLElement>,
  ) => {
    setIsOpen(true);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <StyledTranslateIcon onClick={handleOpen} />
      {isOpen && (
        <LanguageSelector
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
        />
      )}
    </>
  );
};
