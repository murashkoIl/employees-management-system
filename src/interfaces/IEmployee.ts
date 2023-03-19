import { SkillMastery } from "@graphql/Cv/Cv.interface";
import { LanguageProficiency } from "@interfaces/language.interface";

export interface IEmployee {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

export interface IEmployeeTable extends IEmployee {
  department: string;
  specialization: string;
}

export interface IEmployeeInfo extends IEmployee {
  departmentId: string;
  specialization: string;
}

export interface IEmployeeCore {
  auth: {
    email: string;
    password: string;
  };
  profile: {
    first_name: string;
    last_name: string;
    departmentId: string;
    positionId: string;
    skills: SkillMastery[];
    languages: LanguageProficiency[];
  };
  cvsIds: string[];
  role: string;
}
