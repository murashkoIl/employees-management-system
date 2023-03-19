import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { IProject } from "@interfaces/IProject";
import { CREATE_PROJECT } from "@graphql/Project/Project.queries";
import { useMutation } from "@apollo/client";
import {
  CreateProjectInput,
  CreateProjectOutput,
} from "@graphql/Project/Project.interface";
import { format } from "date-fns";
import { ProjectInfoForm } from "../../components/ProjectInfoForm";
import { ROUTE } from "@constants/route";
import { useCallback, useState } from "react";
import { createProjectCacheUpdate } from "@graphql/Project/Project.cache";
import { Loader } from "@src/components/Loader";
import { InlineError } from "@src/components/InlineError";

export const ProjectInfoCreate = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [createProject] = useMutation<CreateProjectOutput, CreateProjectInput>(
    CREATE_PROJECT,
    {
      onCompleted: () => {
        navigate(ROUTE.PROJECTS);
      },
      onError: (error) => {
        setIsLoading(false);
        setFetchError(error.message);
      },
    },
  );

  const onSubmit: SubmitHandler<IProject> = useCallback(
    (data) => {
      createProject({
        variables: {
          project: {
            name: data.name,
            internal_name: data.internalName,
            description: data.description,
            domain: data.domain,
            start_date: format(new Date(data.startDate), "yyyy-MM-dd"),
            end_date: data.endDate
              ? format(new Date(data.endDate), "yyyy-MM-dd")
              : null,
            team_size: Number(data.teamSize),
            skillsIds: [], //TODO: replace with entities
          },
        },
        update: createProjectCacheUpdate(),
      });
    },
    [createProject],
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : fetchError ? (
        <InlineError message={fetchError} />
      ) : (
        <ProjectInfoForm
          onSubmit={onSubmit}
          onError={(err) => setFetchError(err.message)}
        />
      )}
    </>
  );
};
