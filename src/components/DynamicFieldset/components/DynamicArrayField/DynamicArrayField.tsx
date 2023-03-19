import { Close } from "@mui/icons-material";
import {
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { StyledCard } from "./DynamicArrayField.styles";
import { DynamicArrayFieldProps } from "./DynamicArrayField.types";

const DynamicArrayField = <T extends string>({
  entryName,
  onDelete,
}: DynamicArrayFieldProps<T>) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    onDelete(entryName);
  };

  return (
    <Stack direction="row" gap={3}>
      <StyledCard variant="outlined">
        <Typography>{entryName}</Typography>
        <IconButton sx={{ padding: "0.3em" }} onClick={handleDelete}>
          <Close />
        </IconButton>
      </StyledCard>
    </Stack>
  );
};

export default memo(DynamicArrayField);
