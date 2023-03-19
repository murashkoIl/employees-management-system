import { SkillMastery } from "@graphql/Cv/Cv.interface";
import { LanguageProficiency } from "@src/interfaces/language.interface";
import { Project } from "@src/interfaces/project.interface";
import { User } from "@src/interfaces/user.interface";

export type PdfViewerProps = {
  data: {
    name: string;
    languages: LanguageProficiency[];
    projects: Project[];
    skills: SkillMastery[];
    user: User;
  };
  variant?: string;
};

export interface UserNameIds {
  id: string;
  profile: {
    full_name: string;
  };
}
