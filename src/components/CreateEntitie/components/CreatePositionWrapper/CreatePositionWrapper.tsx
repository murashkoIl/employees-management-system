import React from "react";
import { useMutation } from "@apollo/client";
import { useErrorToast } from "@context/ErrorToastStore/ErrorToastStore";
import { useNavigate } from "react-router";
import { ROUTE } from "@constants/route";
import { CREATE_POSITION } from "@graphql/Entity/Position/Position.queries";
import {
  CreatePositionInput,
  CreatePositionOutput,
} from "@graphql/Entity/Position/Position.interface";
import { createPositionCacheUpdate } from "@graphql/Entity/Position/Position.cache";
import { Position } from "@interfaces/position.interface";
import { InfoForm } from "@pages/EntitiesPage/pages/PositionsPage/components/InfoForm";

export const CreatePositionWrapper = () => {
  const { setToastError } = useErrorToast();
  const navigate = useNavigate();

  const [createEntry] = useMutation<CreatePositionOutput, CreatePositionInput>(
    CREATE_POSITION,
    {
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
    },
  );

  const handleEntryCreate = (data: Position) => {
    createEntry({
      variables: {
        position: {
          name: data.name,
        },
      },
      update: createPositionCacheUpdate(),
    });
  };

  const handleEntryClose = () => {
    navigate(ROUTE.ENTITIES);
  };

  return <InfoForm onSubmit={handleEntryCreate} onCancel={handleEntryClose} />;
};
