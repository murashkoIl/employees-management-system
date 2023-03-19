import { useState } from "react";
import { InfoFormWrapper } from "@components/styled/InfoFormWrapper";
import { StyledDialogActions } from "../styled/StyledDialogActions";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { ProjectAutocomplete } from "@components/ProjectAutocomplete";
import { Fieldset } from "@components/Fieldset";
import { CvInfoProps } from "./CvInfo.types";
import { memo, useEffect } from "react";
import { CvInput } from "@graphql/Cv/Cv.interface";
import { CvPatternsWithOverlay } from "@components/CvPatterns";
import { SaveButtonWithAdminAccess } from "@components/FormSaveButton";
import { useQuery } from "@apollo/client";
import { ProjectsData } from "@graphql/Project/Project.interface";
import { GET_PROJECTS } from "@graphql/Project/Project.queries";
import { useToggle } from "@src/hooks/useToggle";

export const CvInfo = memo(({ cv, onSubmit, onCancel }: CvInfoProps) => {
  const [isPatternsVisible, showPreview, hidePreview] = useToggle(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { data: projects } = useQuery<ProjectsData>(GET_PROJECTS, {
    onCompleted: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const { control, handleSubmit, reset } = useForm<CvInput>({
    defaultValues: {
      name: cv.name,
      description: cv.description,
      projectsIds: cv.projectsIds,
    },
  });

  useEffect(() => {
    const { name, description, projectsIds } = cv;

    reset({ name, description, projectsIds });
  }, [cv, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InfoFormWrapper>
          <Fieldset
            control={control}
            required="Please, specify the field"
            label="Name"
            name="name"
          />
          <Fieldset
            control={control}
            isMultiline={true}
            required="Please, specify the field"
            label="Description"
            name="description"
          />
        </InfoFormWrapper>
        {projects && cv.projects && (
          <ProjectAutocomplete
            existingProjects={cv.projects}
            projects={projects}
            control={control}
            error={error}
            defaultValue=""
            isLoading={isLoading}
            name="projectsIds"
          />
        )}

        <StyledDialogActions>
          <SaveButtonWithAdminAccess />
          <Button
            onClick={onCancel}
            type="reset"
            value="Cancel"
            variant="outlined"
            color="info"
          >
            Cancel
          </Button>
          <Button onClick={showPreview} variant="outlined">
            Preview
          </Button>
        </StyledDialogActions>
      </form>
      {isPatternsVisible && <CvPatternsWithOverlay onClose={hidePreview} />}
    </>
  );
});
