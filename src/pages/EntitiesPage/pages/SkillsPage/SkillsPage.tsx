import { InfoForm } from "./components/InfoForm";
import { useEffect, useState } from "react";
import { WrapperDiv, StyledButtonWrapper } from "../../EntitiesPage.styles";
import { InfoItem } from "@components/InfoItem";
import { useNavigate, useParams } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { ROUTE } from "@constants/route";
import { useSearchParams } from "react-router-dom";
import { Loader } from "@components/Loader";
import { InlineError } from "@components/InlineError";
import { useErrorToast } from "@context/ErrorToastStore/ErrorToastStore";

import { DeleteEntityEntryInput } from "@graphql/Entity/Entity.interface";
import {
  DELETE_SKILL,
  GET_SKILLS,
  UPDATE_SKILL,
} from "@graphql/Entity/Skill/Skill.queries";
import {
  DeleteSkillOutput,
  GetSkillsData,
  UpdateSkillInput,
  UpdateSkillResult,
} from "@graphql/Entity/Skill/Skill.interface";
import { Skill } from "@interfaces/skill.interface";
import {
  deleteSkillCacheUpdate,
  skillCacheUpdate,
} from "@graphql/Entity/Skill/Skill.cache";
import { useModal } from "@hooks/useModal";
import { CreateSkillWrapper } from "@components/CreateEntitie/components/CreateSkillsWrapper";

export const SkillsPage = () => {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const { setToastError } = useErrorToast();
  const [active, setActive] = useState("-1");
  const [Modal, openModal, closeModal] = useModal(CreateSkillWrapper);

  const { data, loading, refetch } = useQuery<GetSkillsData>(GET_SKILLS, {
    variables: { id: entryId },
    onCompleted: (data) => {
      const firstEntry = data.skills[0];

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
  });

  const [deleteEntry] = useMutation<DeleteSkillOutput, DeleteEntityEntryInput>(
    DELETE_SKILL,
    {
      variables: {
        id: entryId!,
      },
      onError: (err) => {
        const response = err.graphQLErrors[0].extensions.response as {
          message?: string[];
        };

        if (response) {
          setToastError(
            (response.message && response.message[0]) || "Something went wrong",
          );
        }
      },
    },
  );

  const [updateEntry] = useMutation<UpdateSkillResult, UpdateSkillInput>(
    UPDATE_SKILL,
    {
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
      navigate(`${ROUTE.ENTITIES}/skills`);
    }
    deleteEntry({
      variables: { id },
      optimisticResponse: {
        deleteSkill: {
          affected: 1,
        },
      },
      update: deleteSkillCacheUpdate(id),
    });
  };

  const handleInfoFormSubmit = (data: Skill) => {
    updateEntry({
      variables: {
        id: entryId!,
        skill: {
          name: data.name,
        },
      },
      update: skillCacheUpdate(entryId!),
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
            {data?.skills?.map((entry: Skill, index: number) => {
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
                data.skills.find(({ id }) => id === active) || ({} as Skill)
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
