import { CacheUpdaterFunction } from "src/types";
import { DeleteEntityEntryInput } from "../Entity.interface";
import { GET_LANGUAGES } from "./Language.queries";
import {
  CreateLanguageInput,
  CreateLanguageOutput,
  DeleteLanguageOutput,
  GetLanguagesData,
  UpdateLanguageInput,
  UpdateLanguageResult,
} from "./Language.interface";

export const deleteLanguageUpdateCache =
  (
    id: string,
  ): CacheUpdaterFunction<DeleteLanguageOutput, DeleteEntityEntryInput> =>
  (cache, { data }) => {
    const existingLanguages = cache.readQuery<GetLanguagesData>({
      query: GET_LANGUAGES,
    });

    if (existingLanguages && data?.deleteLanguage.affected) {
      cache.writeQuery({
        query: GET_LANGUAGES,
        data: {
          languages: existingLanguages.languages.filter(
            (entry) => entry.id !== id,
          ),
        },
      });
    }
  };

export const createLanguageCacheUpdate =
  (): CacheUpdaterFunction<CreateLanguageOutput, CreateLanguageInput> =>
  (cache, { data }) => {
    const existingLanguages = cache.readQuery<GetLanguagesData>({
      query: GET_LANGUAGES,
    });

    if (existingLanguages) {
      cache.writeQuery({
        query: GET_LANGUAGES,
        data: {
          languages: [data?.createLanguage, ...existingLanguages.languages],
        },
      });
    }
  };

export const languageCacheUpdate =
  (
    id: string,
  ): CacheUpdaterFunction<UpdateLanguageResult, UpdateLanguageInput> =>
  (cache, { data }) => {
    const existingLanguages = cache.readQuery<GetLanguagesData>({
      query: GET_LANGUAGES,
    });

    if (existingLanguages) {
      cache.writeQuery({
        query: GET_LANGUAGES,
        data: {
          languages: [
            ...existingLanguages.languages.filter(
              (language) => language.id !== id,
            ),
            data?.updateLanguage,
          ],
        },
      });
    }
  };
