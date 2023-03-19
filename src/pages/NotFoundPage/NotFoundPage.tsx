import { Stack, Typography } from "@mui/material";
import notFound from "@assets/images/notFound.svg";
import { Img, Wrapper, StyledButton } from "./NotFoundPage.styles";
import { Link } from "react-router-dom";
import { ROUTE } from "@constants/route";

export function NotFoundPage() {
  return (
    <Stack justifyContent="center" alignItems="center" fontSize="2rem">
      <Typography variant="h3" component="h3">
        <Wrapper>
          <Img src={notFound} alt="Not Found Page" />
          <Link to={ROUTE.EMPLOYEES}>
            <StyledButton variant="outlined">
              <Typography>Go Back</Typography>
            </StyledButton>
          </Link>
        </Wrapper>
      </Typography>
    </Stack>
  );
}
