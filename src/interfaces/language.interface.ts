import { Proficiency } from "@constants/language-proficiency.constants";

export interface Language {
  id: string;
  iso2: string;
  name: string;
}

export interface LanguageProficiency {
  language_name: string;
  proficiency: Proficiency;
}
