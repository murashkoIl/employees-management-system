import { LanguageProficiency } from "./language.interface";
import { Project } from "./project.interface";
import { SkillMastery } from "./skill.interface";
import { User } from "./user.interface";

export interface Cv {
  id: string;
  name: string;
  description: string;
  user: User;
  projects: Project[];
  skills: SkillMastery[];
  languages: LanguageProficiency[];
  is_template: boolean;
}
