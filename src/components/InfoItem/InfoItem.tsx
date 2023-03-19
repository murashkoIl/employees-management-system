import { StyledDiv, StyledLink } from "./InfoItem.styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Typography } from "@mui/material";
import { withAdminAccess } from "@hoc/withAdminAccess";
import { InfoItemProps } from "./InfoItem.types";

const DeleteOutlineIconWithAdminAccess = withAdminAccess(DeleteOutlineIcon);

export const InfoItem = ({ id, name, onDelete }: InfoItemProps) => {
  // move outside

  const handleDelete: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <StyledDiv>
      <StyledLink to={id}>
        <Typography>{name}</Typography>
        <DeleteOutlineIconWithAdminAccess onClick={handleDelete} />
      </StyledLink>
    </StyledDiv>
  );
};
