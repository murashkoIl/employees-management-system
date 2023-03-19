import React from "react";
import { useMutation } from "@apollo/client";
import {
  CreateDepartmentInput,
  CreateDepartmentOutput,
  Department,
} from "@graphql/Entity/Department/Department.interface";
import { CREATE_DEPARTMENT } from "@graphql/Entity/Department/Department.queries";
import { createDepartmentCacheUpdate } from "@graphql/Entity/Department/Departments.cache";
import { useErrorToast } from "@context/ErrorToastStore/ErrorToastStore";
import { useNavigate } from "react-router";
import { ROUTE } from "@constants/route";
import { InfoForm } from "@src/pages/EntitiesPage/pages/DepartmentsPage/components/InfoForm";

export const CreateDepartmentWrapper = () => {
  const { setToastError } = useErrorToast();
  const navigate = useNavigate();

  const [createEntry] = useMutation<
    CreateDepartmentOutput,
    CreateDepartmentInput
  >(CREATE_DEPARTMENT, {
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

  const handleEntryCreate = (data: Department) => {
    createEntry({
      variables: {
        department: {
          name: data.name,
        },
      },
      update: createDepartmentCacheUpdate(),
    });
  };

  const handleEntryClose = () => {
    navigate(ROUTE.ENTITIES);
  };

  return (
    <InfoForm
      onSubmit={handleEntryCreate}
      onCancel={handleEntryClose}
    />
  );
};
