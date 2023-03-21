import { MenuItem } from "@mui/material";
import { withOverlay } from "@src/hoc/withOverlay";
import { languageStore } from "@src/stores/LanguageStore/LanguageStore";
import { AppLanguage } from "@src/stores/LanguageStore/LanguageStore.types";
import { observer } from "mobx-react-lite";
import { languages } from "../LanguageSelect/LanguageSelect.data";
import { StyledMenu } from "../LanguageSelect/LanguageSelect.styles";
import { useTranslation } from "react-i18next";

const LanguageSelector = ({
  open,
  anchorEl,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
}) => {
  const { setLanguage } = languageStore;
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: AppLanguage) => {
    return function () {
      setLanguage(lang);
      i18n.changeLanguage(lang);
    };
  };

  return (
    <StyledMenu open={open} anchorEl={anchorEl}>
      {languages.map((lang) => (
        <MenuItem
          disabled={lang === languageStore.language$}
          sx={{ width: "100%" }}
          onClick={handleLanguageChange(lang)}
          key={lang}
        >
          {lang}
        </MenuItem>
      ))}
    </StyledMenu>
  );
};

export default withOverlay(observer(LanguageSelector));
