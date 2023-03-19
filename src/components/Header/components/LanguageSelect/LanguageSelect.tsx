import { useState } from "react";
import { StyledTranslateIcon } from "./LanguageSelect.styles";
import { LanguageSelector } from "../LanguageSelector";

export const LanguageSelect = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <StyledTranslateIcon onClick={handleOpen} />
      {isOpen && <LanguageSelector open={isOpen} onClose={handleClose} />}
    </>
  );
};
