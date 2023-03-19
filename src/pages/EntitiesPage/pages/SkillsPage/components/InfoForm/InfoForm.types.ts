import { SubmitHandler } from "react-hook-form";

export type InfoFormProps = {
  onSubmit: SubmitHandler<SkillInput>;
  onCancel: () => void;
  input?: SkillInput;
};

export type SkillInput = {
  id: string;
  name: string;
};
