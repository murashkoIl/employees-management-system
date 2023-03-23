/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  DialogActions,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Fieldset } from "@components/Fieldset";
import { SaveButtonWithAdminAccess } from "@components/FormSaveButton";
import { InfoFormWrapper } from "@components/styled/InfoFormWrapper";
import { ROUTE } from "@constants/route";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { EmployeeCreateInfoFormProps } from "./EmployeeCreateInfoForm.types";
import { IEmployeeCore } from "@interfaces/IEmployee";
import { ErrorToast } from "@components/ErrorToast";
import { SelectLabelWrapper } from "@components/styled/SelectLabel";
import { ROLES } from "@constants/roles";
import { useTranslation } from "react-i18next";

export const EmployeeCreateInfoForm = ({
  onSubmit,
  error,
  positions,
  departments,
}: EmployeeCreateInfoFormProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm<IEmployeeCore>({
    defaultValues: {
      auth: {
        email: "",
        password: "",
      },
      profile: {
        first_name: "",
        last_name: "",
        departmentId: "",
        positionId: "",
        role: "",
        skills: [],
        languages: [],
      },
      cvsIds: [],
    },
  });

  const onCancel: React.MouseEventHandler = (e) => {
    navigate(ROUTE.EMPLOYEES);
  };

  return error ? (
    <ErrorToast message={error} />
  ) : (
    <form
      style={{ width: "100%", padding: "1em" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InfoFormWrapper>
        <Fieldset
          control={control}
          required={t("fieldset.required") || ""}
          label={t("table.tableHead.email")}
          type="email"
          name="auth.email"
        />
        <Fieldset
          control={control}
          required={t("fieldset.required") || ""}
          label={t("table.tableHead.password")}
          type="password"
          name="auth.password"
        />
        <Fieldset
          control={control}
          required={t("fieldset.required") || ""}
          label={t("table.tableHead.name")}
          name="profile.first_name"
        />
        <Fieldset
          control={control}
          required={t("fieldset.required") || ""}
          label={t("table.tableHead.lastName")}
          name="profile.last_name"
        />
        <SelectLabelWrapper>
          <Typography sx={{ opacity: "0.7" }}>
            {t("employeesPage.createEmployee.role")}
          </Typography>
          <Controller
            name="profile.role"
            control={control}
            render={({ field }) => (
              <Select sx={{ minWidth: "12em" }} {...field}>
                <MenuItem value={ROLES.ADMIN}>{ROLES.ADMIN}</MenuItem>
                <MenuItem value={ROLES.EMPLOYEE}>{ROLES.EMPLOYEE}</MenuItem>
              </Select>
            )}
          />
        </SelectLabelWrapper>
        <SelectLabelWrapper>
          <Typography sx={{ opacity: "0.7" }}>
            {t("employeesPage.createEmployee.departments")}
          </Typography>
          <Controller
            name="profile.departmentId"
            control={control}
            render={({ field }) => (
              <Select sx={{ minWidth: "12em" }} {...field}>
                {departments?.map((dep) => (
                  <MenuItem key={dep.id} value={dep.id}>
                    {dep.name || "Unknown"}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </SelectLabelWrapper>
        <SelectLabelWrapper>
          <Typography sx={{ opacity: "0.7" }}>
            {t("employeesPage.createEmployee.position")}
          </Typography>
          <Controller
            name="profile.positionId"
            control={control}
            render={({ field }) => (
              <Select sx={{ minWidth: "12em" }} {...field}>
                {positions?.map((pos) => (
                  <MenuItem key={pos.id} value={pos.id}>
                    {pos.name || "Unknown"}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </SelectLabelWrapper>
        {/* TODO: Add skills and languages here */}
      </InfoFormWrapper>
      <DialogActions>
        <SaveButtonWithAdminAccess />
        <Button
          onClick={onCancel}
          type="reset"
          value="Cancel"
          variant="outlined"
          color="info"
        >
          {t("buttons.cancel")}
        </Button>
      </DialogActions>
    </form>
  );
};
