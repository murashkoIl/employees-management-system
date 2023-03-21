/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useMutation, useQuery } from "@apollo/client";
import { InlineError } from "@components/InlineError";
import { Loader } from "@components/Loader";
import { useErrorToast } from "@context/ErrorToastStore/ErrorToastStore";
import {
  CvInfoData,
  CvInput,
  UpdateCvInput,
  UpdateCvOutput,
} from "@graphql/Cv/Cv.interface";
import { GET_CV_INFO, UPDATE_CV } from "@graphql/Cv/Cv.queries";
import { memo, useCallback, useLayoutEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { CvInfo } from "@components/CvInfo";
import { cvCacheUpdate } from "@graphql/Cv/Cv.cache";
import { useTranslation } from "react-i18next";

export const CvInfoUpdate = memo(() => {
  const { cvId } = useParams();
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [cvInput, setCvInput] = useState<CvInput | null>(null);
  const { setToastError } = useErrorToast();
  const navigate = useNavigate();

  const {
    data: cvInfoData,
    refetch,
    loading: getCvInfoLoading,
  } = useQuery<CvInfoData>(GET_CV_INFO, {
    variables: {
      id: cvId,
    },

    onError: (error) => {
      setError(error.message);
    },
    fetchPolicy: "network-only",
  });

  useLayoutEffect(() => {
    if (cvInfoData) {
      const { name, description, user, projects } = cvInfoData.cv;

      setCvInput({
        name,
        description,
        userId: user?.id,
        projectsIds: projects.map((p) => p.id),
        projects: projects,
        skills: [],
        languages: [],
        is_template: false,
      });
    }
  }, [cvInfoData]);

  const [saveCv, { loading: saveCvLoading }] = useMutation<
    UpdateCvOutput,
    UpdateCvInput
  >(UPDATE_CV, {
    onCompleted: (data) => {
      navigate(pathname.split("/").includes("cvs") ? "/cvs" : "/employees");
    },
    onError: (error) => {
      setToastError(error.message);
    },
  });

  const handleSubmit: SubmitHandler<CvInput> = useCallback(
    (data) => {
      const { name, description, projectsIds } = data;

      saveCv({
        variables: {
          id: cvId!,
          cv: {
            name,
            description,
            projectsIds,
            userId: cvInfoData?.cv.user?.id || "",
            skills: [],
            languages: [],
            is_template: false,
          },
        },
        optimisticResponse: {
          updateCv: {
            name,
            description,
            id: cvId!,
            projects: [],
            user: null,
            skills: [],
            languages: [],
            is_template: false,
          },
        },
        update: cvCacheUpdate(cvId!),
      });
    },
    [cvId, cvInfoData?.cv.user, saveCv],
  );

  const handleCancel: React.MouseEventHandler = (e) => {
    navigate(pathname.split("/").includes("cvs") ? "/cvs" : "/employees");
  };

  const handleTryAgain = () => {
    refetch();
  };

  return getCvInfoLoading || saveCvLoading ? (
    <Loader />
  ) : error ? (
    <InlineError
      message={t("errors.failedToFetchFormData")}
      tryAgainFn={handleTryAgain}
    />
  ) : (
    cvInput && (
      <>
        <CvInfo cv={cvInput} onSubmit={handleSubmit} onCancel={handleCancel} />
      </>
    )
  );
});
