/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useMutation, useQuery } from "@apollo/client";
import { useErrorToast } from "@context/ErrorToastStore/ErrorToastStore";
import { WrapperDiv, StyledButtonWrapper } from "../../EntitiesPage.styles";
import { ROUTE } from "@constants/route";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Loader } from "@components/Loader";
import { InlineError } from "@components/InlineError";
import { Button } from "@mui/material";
import {
  GetDepartmentsData,
  DeleteDepartmentOutput,
  UpdateDepartmentInput,
  UpdateDepartmentResult,
} from "@graphql/Entity/Department/Department.interface";
import {
  DELETE_DEPARTMENT,
  GET_DEPARTMENTS,
  UPDATE_DEPARTMENT,
} from "@graphql/Entity/Department/Department.queries";
import { DeleteEntityEntryInput } from "@graphql/Entity/Entity.interface";
import { Department } from "@interfaces/department.interface";
import { InfoItem } from "@components/InfoItem";
import {
  deleteDepartmentCacheUpdate,
  departmentCacheUpdate,
} from "@graphql/Entity/Department/Departments.cache";
import { InfoForm } from "../SkillsPage/components/InfoForm";
import { useModal } from "@hooks/useModal";
import { CreateDepartmentWrapper } from "@components/CreateEntitie/components/CreateDepartmentWrapper";
import { useTranslation } from "react-i18next";

export const DepartmentsPage = () => {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const { setToastError } = useErrorToast();
  const [active, setActive] = useState("-1");
  const [Modal, openModal, closeModal] = useModal(CreateDepartmentWrapper);

  const { data, loading, refetch } = useQuery<GetDepartmentsData>(
    GET_DEPARTMENTS,
    {
      variables: { id: entryId },
      onCompleted: (data) => {
        const firstEntry = data.departments[0];

        if (firstEntry && (firstEntry.id === entryId || !entryId)) {
          const entryToOpen = searchParams.get("open") || firstEntry.id;
          setActive(entryToOpen);
        } else {
          setActive(entryId || "-1");
        }
      },
      onError: (err) => {
        setError(err.message);
      },
    },
  );

  const [deleteEntry] = useMutation<
    DeleteDepartmentOutput,
    DeleteEntityEntryInput
  >(DELETE_DEPARTMENT, {
    variables: {
      id: entryId!,
    },
    onError: (err) => {
      const response = err.graphQLErrors[0].extensions.response as {
        message?: string[];
      };

      if (response) {
        setToastError(
          (response.message && response.message[0]) ||
            t("errors.somethingWentWrong"),
        );
      }
    },
  });

  const [updateEntry] = useMutation<
    UpdateDepartmentResult,
    UpdateDepartmentInput
  >(UPDATE_DEPARTMENT, {
    onError: (err) => {
      const response = err.graphQLErrors[0].extensions.response as {
        message?: string[];
      };

      setToastError(
        (response?.message && response.message[0]) ||
          t("errors.somethingWentWrong"),
      );
    },
  });

  useEffect(() => {
    if (active !== "-1") {
      navigate(active);
    }
  }, [active, navigate]);

  const handleActive = (activeId: string) => {
    setActive(activeId);
  };

  const handleTryAgain = () => {
    refetch();
  };

  const handleEntryDelete = (id: string) => {
    if (active === id) {
      navigate(`${ROUTE.ENTITIES}/departments`);
    }
    deleteEntry({
      variables: { id },
      optimisticResponse: {
        deleteDepartment: {
          affected: 1,
        },
      },
      update: deleteDepartmentCacheUpdate(id),
    });
  };

  const handleInfoFormSubmit = (data: Department) => {
    updateEntry({
      variables: {
        id: entryId!,
        department: {
          name: data.name,
        },
      },
      update: departmentCacheUpdate(entryId!),
    });
  };

  const handleCancel = () => {
    navigate(ROUTE.ENTITIES);
    closeModal();
  };

  return (
    <WrapperDiv>
      {Modal}
      {loading ? (
        <Loader />
      ) : error ? (
        <InlineError message={error} tryAgainFn={handleTryAgain}></InlineError>
      ) : (
        <>
          <div className="sidebar">
            {data?.departments?.map((entry: Department, index: number) => {
              return (
                <div
                  className={active === entry.id ? "active" : ""}
                  key={entry.id}
                  onClick={() => handleActive(entry.id)}
                >
                  <InfoItem
                    name={entry.name}
                    id={entry.id}
                    onDelete={handleEntryDelete}
                  />
                </div>
              );
            })}
            <StyledButtonWrapper>
              <Button onClick={openModal}>
                <AddIcon />
              </Button>
            </StyledButtonWrapper>
          </div>
          {active !== "-1" && data && (
            <InfoForm
              input={
                data.departments.find(({ id }) => id === active) ||
                ({} as Department)
              }
              onSubmit={handleInfoFormSubmit}
              onCancel={handleCancel}
            />
          )}
        </>
      )}
    </WrapperDiv>
  );
};
