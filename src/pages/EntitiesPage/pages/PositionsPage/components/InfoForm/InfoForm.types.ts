import { Position } from "@interfaces/position.interface";
import { SubmitHandler } from "react-hook-form";

export type InfoFormProps = {
  onSubmit: SubmitHandler<Position>;
  onCancel: () => void;
  input?: Position;
};
