import React from "react";
import { useMutation } from "@apollo/client";
import { useErrorToast } from "@context/ErrorToastStore/ErrorToastStore";
import { useNavigate } from "react-router";
import { ROUTE } from "@constants/route";
import { CREATE_LANGUAGE } from "@graphql/Entity/Language/Language.queries";
import {
  CreateLanguageInput,
  CreateLanguageOutput,
} from "@graphql/Entity/Language/Language.interface";
import { Language } from "@interfaces/language.interface";
import { createLanguageCacheUpdate } from "@graphql/Entity/Language/Language.cache";
import { InfoForm } from "@src/pages/EntitiesPage/pages/LanguagesPage/components/InfoForm";
import { useTranslation } from "react-i18next";

export const CreateLanguageWrapper = () => {
  const { setToastError } = useErrorToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [createEntry] = useMutation<CreateLanguageOutput, CreateLanguageInput>(
    CREATE_LANGUAGE,
    {
      onCompleted: () => {
        navigate(ROUTE.ENTITIES);
      },
      onError: (err) => {
        const response = err.graphQLErrors[0].extensions.response as {
          message?: string[];
        };

        setToastError(
          (response?.message && response.message[0]) ||
            t("errors.somethingWentWrong"),
        );
      },
    },
  );

  const handleEntryCreate = (data: Language) => {
    createEntry({
      variables: {
        language: {
          name: data.name,
          iso2: data.iso2,
        },
      },
      update: createLanguageCacheUpdate(),
    });
  };

  const handleEntryClose = () => {
    navigate(ROUTE.ENTITIES);
  };

  return <InfoForm onSubmit={handleEntryCreate} onCancel={handleEntryClose} />;
};
