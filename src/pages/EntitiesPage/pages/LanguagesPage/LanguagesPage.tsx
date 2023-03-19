import {
  DELETE_LANGUAGE,
  GET_LANGUAGES,
  UPDATE_LANGUAGE,
} from "@graphql/Entity/Language/Language.queries";
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
import {
  DeleteLanguageOutput,
  GetLanguagesData,
  Language,
  UpdateLanguageInput,
  UpdateLanguageResult,
} from "@graphql/Entity/Language/Language.interface";
import { DeleteEntityEntryInput } from "@graphql/Entity/Entity.interface";
import {
  deleteLanguageUpdateCache,
  languageCacheUpdate,
} from "@graphql/Entity/Language/Language.cache";
import { CreateLanguageWrapper } from "@components/CreateEntitie/components/CreateLanguageWrapper";
import { useModal } from "@hooks/useModal";

export const LanguagesPage = () => {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const { setToastError } = useErrorToast();
  const [active, setActive] = useState("-1");
  const [Modal, openModal, closeModal] = useModal(CreateLanguageWrapper);

  const { data, loading, refetch } = useQuery<GetLanguagesData>(GET_LANGUAGES, {
    variables: { id: entryId },
    onCompleted: (data) => {
      const firstEntry = data.languages[0];

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

  const [deleteEntry] = useMutation<
    DeleteLanguageOutput,
    DeleteEntityEntryInput
  >(DELETE_LANGUAGE, {
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
  });

  const [updateEntry] = useMutation<UpdateLanguageResult, UpdateLanguageInput>(
    UPDATE_LANGUAGE,
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
      navigate(`${ROUTE.ENTITIES}/languages`);
    } else {
      navigate(`${ROUTE.ENTITIES}/languages?open=${active}`);
    }
    deleteEntry({
      variables: { id },
      optimisticResponse: {
        deleteLanguage: {
          affected: 1,
        },
      },
      update: deleteLanguageUpdateCache(id),
    });
  };

  const handleInfoFormSubmit = (data: Language) => {
    updateEntry({
      variables: {
        id: entryId!,
        language: {
          iso2: data.iso2,
          name: data.name,
        },
      },
      update: languageCacheUpdate(entryId!),
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
            {data?.languages?.map((entry: Language, index: number) => {
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
                data.languages.find(({ id }) => id === active) ||
                ({} as Language)
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
