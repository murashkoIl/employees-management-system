import { styled } from "@mui/system";
import { Translate } from "@mui/icons-material";
import { Menu } from "@mui/material";

export const StyledTranslateIcon = styled(Translate)({
  width: "0.875em",
  "&:hover": {
    color: "#1890FF",
    cursor: "pointer",
  },
});

export const StyledMenu = styled(Menu)({
  borderRadius: "10px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
  "& .MuiPaper-root": {
    position: "absolute",
    top: "4em !important",
    right: "1.5em !important",
    left: "unset !important",
  },
});
