import React, { memo, useEffect } from "react";
import { InfoFormWrapper } from "@components/styled/InfoFormWrapper";
import { Fieldset } from "@components/Fieldset";
import { DatePickerFieldset } from "@components/DatePickerFieldset";
import { Button, DialogActions } from "@mui/material";
import { useForm } from "react-hook-form";
import { IProject } from "@interfaces/IProject";
import { ROUTE } from "@constants/route";
import { useNavigate } from "react-router";
import { ProjectInfoFormProps } from "./ProjectInfoForm.types";
import { SaveButtonWithAdminAccess } from "@src/components/FormSaveButton";
import { SkillsInput } from "../SkillsInput";
import { resetProject } from "../../helpers"

export const ProjectInfoForm = memo(
  ({ onSubmit, onError, data }: ProjectInfoFormProps) => {
    const navigate = useNavigate();
    const { control, handleSubmit, reset } = useForm<IProject>({
      mode: "all",
      defaultValues: {
        name: "",
        internalName: "",
        startDate: "",
        endDate: "",
        domain: "",
        description: "",
        teamSize: 0,
        techStack: [],
      },
    });

    useEffect(() => {
      data && reset(resetProject(data.project));
    }, [data, reset]);

    const onCancel: React.MouseEventHandler = () => {
      navigate(ROUTE.PROJECTS);
    };

    return (
      <form
        style={{ width: "100%", padding: "1em" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InfoFormWrapper>
          <Fieldset
            required="Please, specify the field"
            label="Internal name"
            control={control}
            name="internalName"
          />
          <Fieldset
            required="Please, specify the field"
            label="Name"
            control={control}
            name="name"
          />
        </InfoFormWrapper>

        <InfoFormWrapper>
          <DatePickerFieldset
            control={control}
            label="Start date"
            name="startDate"
            required={"Please, specify the correct date"}
          />
          <DatePickerFieldset
            control={control}
            label="End date"
            name="endDate"
          />
        </InfoFormWrapper>
        <InfoFormWrapper>
          <Fieldset
            required="Please, specify the field"
            label="Domain"
            control={control}
            name="domain"
          />
          <Fieldset
            required="Please, specify the field"
            label="Team size"
            control={control}
            name="teamSize"
          />
        </InfoFormWrapper>

        <InfoFormWrapper>
          <Fieldset
            inputWidth="31.25em"
            isMultiline={true}
            required="Please, specify the field"
            label="Description"
            control={control}
            name="description"
          />
        </InfoFormWrapper>
        <InfoFormWrapper>
          <SkillsInput control={control} onError={onError} />
        </InfoFormWrapper>

        <DialogActions>
          <SaveButtonWithAdminAccess />
          <Button
            type="reset"
            value="Cancel"
            variant="outlined"
            color="info"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    );
  },
);
