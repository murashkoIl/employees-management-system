import { CircularProgress } from "@mui/material";
import { StyledLoaderWrapper } from "./Loader.styles";

export const Loader = () => {
  return (
    <StyledLoaderWrapper>
      <CircularProgress />
    </StyledLoaderWrapper>
  );
};
