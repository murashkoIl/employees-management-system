import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DeleteWithAdminAccessButton } from "../TableDeleteItemButton";
import { TableRowProps } from "./TableRow.types";

export function TableRow({
  redirectButtonText,
  deleteButtonText,
  onDelete,
  children,
  id,
}: TableRowProps) {
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onDelete(id);
  };
  
  return (
    <Accordion sx={{ width: "100%" }}>
      <AccordionSummary
        id="header"
        aria-controls="content"
        expandIcon={<ExpandMore />}
      >
        <Grid container>{children}</Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Button>
          <Link to={id}>{redirectButtonText}</Link>
        </Button>
        <DeleteWithAdminAccessButton
          handleDelete={handleDelete}
          deleteButtonText={deleteButtonText}
        />
      </AccordionDetails>
    </Accordion>
  );
}
