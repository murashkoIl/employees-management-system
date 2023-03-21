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
import { resetProject } from "../../helpers";
import { useTranslation } from "react-i18next";

export const ProjectInfoForm = memo(
  ({ onSubmit, onError, data }: ProjectInfoFormProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
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
            required={t("fieldset.required") || ""}
            label={t("table.tableHead.internalName")}
            control={control}
            name="internalName"
          />
          <Fieldset
            required={t("fieldset.required") || ""}
            label={t("table.tableHead.name")}
            control={control}
            name="name"
          />
        </InfoFormWrapper>

        <InfoFormWrapper>
          <DatePickerFieldset
            control={control}
            label={t("table.tableHead.startDate")}
            name="startDate"
            required={t("fieldset.required") || ""}
          />
          <DatePickerFieldset
            control={control}
            label={t("table.tableHead.endDate")}
            name="endDate"
          />
        </InfoFormWrapper>
        <InfoFormWrapper>
          <Fieldset
            required={t("fieldset.required") || ""}
            label={t("table.tableHead.domain")}
            control={control}
            name="domain"
          />
          <Fieldset
            required="Please, specify the field"
            label={t("table.tableHead.teamSize")}
            control={control}
            name="teamSize"
          />
        </InfoFormWrapper>

        <InfoFormWrapper>
          <Fieldset
            inputWidth="31.25em"
            isMultiline={true}
            required={t("fieldset.required") || ""}
            label={t("table.tableHead.description")}
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
            {t("buttons.cancel")}
          </Button>
        </DialogActions>
      </form>
    );
  },
);
