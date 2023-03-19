import { MenuItem } from "@mui/material";
import { withOverlay } from "@src/hoc/withOverlay";
import { languageStore } from "@src/stores/LanguageStore/LanguageStore";
import { AppLanguage } from "@src/stores/LanguageStore/LanguageStore.types";
import { observer } from "mobx-react-lite";
import { languages } from "../LanguageSelect/LanguageSelect.data";
import { StyledMenu } from "../LanguageSelect/LanguageSelect.styles";

const LanguageSelector = ({ open }: { open: boolean }) => {
  const { setLanguage } = languageStore;

  const handleLanguageChange = (lang: AppLanguage) => {
    return function () {
      setLanguage(lang);
    };
  };

  return (
    <StyledMenu open={open}>
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
