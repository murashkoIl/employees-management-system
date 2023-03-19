import { DeleteResult } from "@graphql/shared/interfaces";

export interface UpdateLanguageInput {
  id: string;
  language: Pick<Language, "iso2" | "name">;
}

export interface DeleteLanguageOutput {
  deleteLanguage: DeleteResult;
}

export interface Language {
  id: string;
  iso2: string;
  name: string;
}

export interface GetLanguagesData {
  languages: Language[];
}

export interface UpdateLanguageResult {
  updateLanguage: Language;
}

export interface CreateLanguageInput {
  language: Pick<Language, "name" | "iso2">;
}

export interface CreateLanguageOutput {
  createLanguage: {
    languages: Language;
    affected: number;
  };
}
