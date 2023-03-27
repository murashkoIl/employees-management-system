import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CV } from "@graphql/Cv/Cv.queries";
import { ROUTE } from "@constants/route";
import { useNavigate } from "react-router";
import {
  CreateCvInput,
  CreateCvOutput,
  CvInput,
} from "@graphql/Cv/Cv.interface";
import { useCallback, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createCvCacheUpdate } from "@graphql/Cv/Cv.cache";
import { CvCreateInfoForm } from "../CvCreateInfoForm";
import { GET_USERS_NAMES_IDS } from "@graphql/User/User.queries";
import { UsersNamesIdsData } from "../CvCreateInfoForm/CvCreateInfoForm.types";
import { CvInfoCreateProps } from "./CvInfoCreate.types";

export const CvInfoCreatePage = ({ closeModal }: CvInfoCreateProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { data: users } = useQuery<UsersNamesIdsData>(GET_USERS_NAMES_IDS, {
    onError: (error) => {
      setError(error.message);
    },
  });

  const [createCv] = useMutation<CreateCvOutput, CreateCvInput>(CREATE_CV, {
    onCompleted: () => {
      closeModal && closeModal();
      navigate(ROUTE.CVS);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onSubmit: SubmitHandler<CvInput> = useCallback(
    (data) => {
      createCv({
        variables: {
          cv: {
            name: data.name,
            description: data.description,
            userId: data.userId,
            projectsIds: [],
            skills: [],
            languages: [],
            is_template: data.is_template,
          },
        },
        update: createCvCacheUpdate(),
      });
    },
    [createCv],
  );

  return <CvCreateInfoForm users={users} error={error} onSubmit={onSubmit} />;
};
