import React from "react";

export type InlineErrorProps = {
  message: string;
  tryAgainFn?: React.MouseEventHandler<HTMLButtonElement>;
};
