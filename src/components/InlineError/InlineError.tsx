import { Button, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { StyledInlineErrorWrapper } from "./InlineError.styles";
import { InlineErrorProps } from "./InlineError.types";

/**
 *
 * @param message
 * Error message
 *
 * @param tryAgainFn
 *  Optional try-again function. If provided, the component displays
 * a retry button. Can be used e.g. for refetching
 *
 * @returns Inline error that can be embedded say, in place of a table
 * if fetching fails
 */
export const InlineError = ({ message, tryAgainFn }: InlineErrorProps) => {
  return (
    <StyledInlineErrorWrapper>
      <Stack
        spacing={3}
        alignItems="center"
        component={Paper}
        sx={{
          border: "2px solid #fafafa",
          padding: "30px",
          width: "100%",
        }}
      >
        <Typography variant="body1" component="span" textAlign="center">
          {message}
        </Typography>
        {tryAgainFn && (
          <Button variant="contained" color="info" onClick={tryAgainFn}>
            Retry
          </Button>
        )}
      </Stack>
    </StyledInlineErrorWrapper>
  );
};
