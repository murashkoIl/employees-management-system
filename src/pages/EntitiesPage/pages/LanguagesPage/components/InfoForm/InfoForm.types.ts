import { SubmitHandler } from "react-hook-form";

export type InfoFormProps = {
  onSubmit: SubmitHandler<LanguageInput>;
  onCancel: () => void;
  input?: LanguageInput;
};

export type LanguageInput = {
  id: string;
  name: string;
  iso2: string;
};
