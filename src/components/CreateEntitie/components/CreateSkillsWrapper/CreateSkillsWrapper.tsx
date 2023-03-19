import React from "react";
import { useMutation } from "@apollo/client";
import { useErrorToast } from "@context/ErrorToastStore/ErrorToastStore";
import { useNavigate } from "react-router";
import { ROUTE } from "@constants/route";
import { CREATE_SKILL } from "@src/graphql/Entity/Skill/Skill.queries";
import { CreateSkillInput, CreateSkillOutput } from "@graphql/Entity/Skill/Skill.interface";
import { Skill } from "@interfaces/skill.interface";
import { createSkillCacheUpdate } from "@src/graphql/Entity/Skill/Skill.cache";
import { InfoForm } from "@src/pages/EntitiesPage/pages/SkillsPage/components/InfoForm";

export const CreateSkillWrapper = () => {
  const { setToastError } = useErrorToast();
  const navigate = useNavigate();

  const [createEntry] = useMutation<
    CreateSkillOutput,
    CreateSkillInput
  >(CREATE_SKILL, {
    onCompleted: () => {
      navigate(ROUTE.ENTITIES);
    },
    onError: (err) => {
      const response = err.graphQLErrors[0].extensions.response as {
        message?: string[];
      };

      setToastError(
        (response?.message && response.message[0]) || "Something went wrong",
      );
    },
  });

  const handleEntryCreate = (data: Skill) => {
    createEntry({
      variables: {
        skill: {
          name: data.name,
        },
      },
      update: createSkillCacheUpdate(),
    });
  };

  const handleEntryClose = () => {
    navigate(ROUTE.ENTITIES);
  };

  return <InfoForm onSubmit={handleEntryCreate} onCancel={handleEntryClose} />;
};
