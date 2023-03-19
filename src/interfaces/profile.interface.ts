import { SkillMastery } from "@interfaces/skill.interface";
import { LanguageProficiency } from "./language.interface";

export interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  avatar?: string;
  skills: SkillMastery[];
  languages: LanguageProficiency[];
}

export type ProfileInput = {
  first_name: string;
  last_name: string;
  skills: SkillMastery[];
  languages: LanguageProficiency[];
};
