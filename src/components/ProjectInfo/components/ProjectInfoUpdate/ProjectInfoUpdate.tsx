import { useCallback, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { IProject } from "@interfaces/IProject";
import { ProjectInfoUpdateProps } from "./ProjectInfoUpdate.types";
import {
  GET_PROJECT_INFO,
  UPDATE_PROJECT,
} from "@graphql/Project/Project.queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  ProjectInfoData,
  UpdateProjectInput,
  UpdateProjectOutput,
} from "@graphql/Project/Project.interface";
import { format } from "date-fns";
import { ProjectInfoForm } from "../../components/ProjectInfoForm";
import { ROUTE } from "@constants/route";
import { Loader } from "@components/Loader";
import { projectCacheUpdate } from "@graphql/Project/Project.cache";
import { InlineError } from "@src/components/InlineError";

export const ProjectInfoUpdate = ({ projectId }: ProjectInfoUpdateProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();

  const { data: projectData } = useQuery<ProjectInfoData>(GET_PROJECT_INFO, {
    variables: {
      id: projectId,
    },
    onCompleted: (data) => {
      setIsLoading(false);
    },
    onError: (error) => {
      setIsLoading(false);
      setFetchError(error.message);
    },
    fetchPolicy: "network-only",
  });

  const [updateProject] = useMutation<UpdateProjectOutput, UpdateProjectInput>(
    UPDATE_PROJECT,
    {
      onCompleted: () => {
        navigate(ROUTE.PROJECTS);
      },
      onError: (error) => {
        setFetchError(error.message);
      },
    },
  );

  const onSubmit: SubmitHandler<IProject> = useCallback(
    (data) => {
      setIsLoading(true);
      updateProject({
        variables: {
          id: projectId,
          project: {
            name: data.name,
            internal_name: data.internalName,
            description: data.description,
            domain: data.domain,
            start_date: format(new Date(data.startDate), "yyyy-MM-dd"),
            end_date: data.endDate
              ? format(new Date(data.endDate), "yyyy-MM-dd")
              : null,
            team_size: data.teamSize,
            skillsIds: data.techStack.map(({ id }) => id),
          },
        },
        update: projectCacheUpdate(projectId),
      });
    },
    [projectId, updateProject],
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : fetchError ? (
        <InlineError message={fetchError} />
      ) : (
        <ProjectInfoForm
          data={projectData}
          onSubmit={onSubmit}
          onError={(err) => setFetchError(err.message)}
        />
      )}
    </>
  );
};
