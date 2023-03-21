import { useQuery } from "@apollo/client";
import { Stack, Typography } from "@mui/material";
import { DynamicFieldset } from "@src/components/DynamicFieldset";
import { Proficiency } from "@src/constants/language-proficiency.constants";
import { DynamicArrayFieldWithSelect } from "@src/components/DynamicFieldset/components/DynamicArrayFieldWithSelect";
import { GetLanguagesData } from "@src/graphql/Entity/Language/Language.interface";
import { GET_LANGUAGES } from "@src/graphql/Entity/Language/Language.queries";
import { useCallback, useMemo } from "react";
import { useFieldArray } from "react-hook-form";
import { LanguagesInputProps } from "./LanguagesInput.types";
import { useTranslation } from "react-i18next";

export const LanguagesInput = ({ onError, control }: LanguagesInputProps) => {
  const { t } = useTranslation();
  const {
    fields: languagesFields,
    append: appendLanguage,
    remove: removeLanguage,
    update: updateLanguage,
  } = useFieldArray({
    control,
    name: "user.profile.languages",
  });

  const { data: languagesData } = useQuery<GetLanguagesData>(GET_LANGUAGES, {
    onError,
  });

  const handleLanguageDelete = (name: string) => {
    removeLanguage(
      languagesFields.findIndex((language) => language.language_name === name),
    );
  };

  const handleLanguageChange = (name: string, newValue: string) => {
    if (isProficiency(newValue)) {
      updateLanguage(
        languagesFields.findIndex(
          (language) => language.language_name === name,
        ),
        { language_name: name, proficiency: newValue },
      );
    }

    function isProficiency(value: string): value is Proficiency {
      if (Object.values(Proficiency).includes(value as Proficiency)) {
        return true;
      }

      return false;
    }
  };

  const availableLanguages = useMemo(() => {
    if (!languagesData) return [];

    const languagesAlreadyTaken = new Set(
      languagesFields.map(({ language_name }) => language_name),
    );

    return languagesData.languages.reduce((acc, cur) => {
      if (!languagesAlreadyTaken.has(cur.name)) {
        acc.push({ entryName: cur.name, id: cur.id });
      }

      return acc;
    }, [] as { entryName: string; id: string }[]);
  }, [languagesData, languagesFields]);

  const handleNewLanguage = useCallback(
    (entryName: string) => {
      appendLanguage({
        language_name: entryName,
        proficiency: Proficiency.A1,
      });
    },
    [appendLanguage],
  );

  return (
    <>
      <Stack gap={2} justifyContent="start">
        <Typography variant="h5" component="h2">
          {t("employeesPage.languages")}
        </Typography>
        <DynamicFieldset
          onNew={handleNewLanguage}
          inputEntries={availableLanguages}
          fieldForValue="entryName"
        >
          {languagesFields.map((field, index) => (
            <DynamicArrayFieldWithSelect
              key={field.id}
              entryName={field.language_name}
              possibleValues={Proficiency}
              onChange={handleLanguageChange}
              value={field.proficiency}
              onDelete={handleLanguageDelete}
            />
          ))}
        </DynamicFieldset>
      </Stack>
    </>
  );
};
