/* Queries */
import { LanguageProficiency } from "@src/interfaces/language.interface";
import { Project } from "@src/interfaces/project.interface";
import { User } from "@src/interfaces/user.interface";

export interface CvsData {
  cvs: Cv[];
}

export interface CvInfoData {
  cv: CvInfo;
}

export interface CvFullInfo {
  cv: {
    name: string;
    projects: Project[];
    skills: SkillMastery[];
    languages: LanguageProficiency[];
    user: User;
  };
}

export interface CvFullInfoData {
  name: string;
  user: User;
}

export interface CvsNamesData {
  cvs: Cv[];
}

export interface CvNameData {
  cv: {
    name: string;
  };
}

/* Mutations */

export interface CreateCvInput {
  cv: CvInput;
}

export interface CreateCvOutput {
  createCv: {
    id: string;
    cv: CvInput;
  };
}

export interface UpdateCvInput {
  id: string;
  cv: CvInput;
}

export interface UpdateCvOutput {
  updateCv: CvInfo;
}

export interface DeleteCvInput {
  id: string;
}

export interface DeleteCvOutput {
  deleteCv: {
    affected: number;
  };
}

export interface UnbindCvInput {
  id: string;
}

export interface UnbindCvOutput {
  unbindCv: {
    id: string;
  };
}

/* Parts */

// for table
export interface Cv {
  id: string;
  name: string;
  description: string;
}

export interface CvInput {
  name: string;
  description: string;
  userId?: string;
  projectsIds: string[];
  projects?: Project[];
  skills: SkillMastery[];
  languages: LanguageProficiency[];
  is_template: boolean;
}

export interface CvInfo {
  id: string;
  name: string;
  description: string;
  projects: Project[];
  user: null | {
    id: string;
  };
  skills: SkillMastery[];
  languages: LanguageProficiency[];
  is_template: boolean;
}

export interface ProjectPart {
  id: string;
  name: string;
  internal_name: string;
}

export interface SkillMastery {
  skill_name: string;
  mastery: string;
}
