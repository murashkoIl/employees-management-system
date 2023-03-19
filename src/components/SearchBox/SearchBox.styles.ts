import { Search as SearchIcon } from "@mui/icons-material";
import { styled, TextField } from "@mui/material";

export const StyledTextField = styled(TextField)({
  width: "100%",
  "&.MuiFormControl-root": {
    paddingInline: "0",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    top: "0",
  },
});

export const StyledSearchIcon = styled(SearchIcon)({
  margin: "0 !important",
});
