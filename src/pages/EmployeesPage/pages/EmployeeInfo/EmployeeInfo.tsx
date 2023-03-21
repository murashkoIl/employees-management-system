import { Button, DialogActions } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { ROUTE } from "@constants/route";
import { EmployeeInfoProps } from "./EmployeeInfo.types";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_INFO, UPDATE_USER } from "@graphql/User/User.queries";
import {
  GetUserResult,
  UpdateUserInput,
  UpdateUserResult,
} from "@graphql/User/User.interface";
import { memo, useRef, useState } from "react";
import { InlineError } from "@components/InlineError";
import { Loader } from "@components/Loader";
import { SaveButtonWithAdminAccess } from "@components/FormSaveButton";
import { resetEmployee } from "./helpers";
import { CreateUserInput } from "@graphql/User/User.interface";
import { LanguagesInput } from "./components/LanguagesInput";
import { SkillsInput } from "./components/SkillsInput";
import { Observable } from "./Observable";
import { UserDetailsInput } from "./components/UserDetailsInput";
import { userCacheUpdate } from "@graphql/User/User.cache";
import { DynamicFieldsetGroupWrapper } from "@components/styled/DynamicFieldsetGroupWrapper";
import { authStore } from "@src/stores/AuthStore/AuthStore";
import { useTranslation } from "react-i18next";

export const EmployeeInfo = memo(({ employeeId }: EmployeeInfoProps) => {
  const [error, setError] = useState("");
  const { user$ } = authStore;
  const navigate = useNavigate();
  const { t } = useTranslation();

  // TODO: Form must correspond the data sent
  const { control, handleSubmit, reset } = useForm<CreateUserInput>({
    defaultValues: {
      user: {
        departmentId: "",
        positionId: "",
        profile: {
          first_name: "",
          last_name: "",
          skills: [],
          languages: [],
        },
        cvsIds: [],
      },
    },
  });

  const [saveUser, { loading: saveUserLoading }] = useMutation<
    UpdateUserResult,
    UpdateUserInput
  >(UPDATE_USER, {
    onCompleted: (data) => {
      navigate(ROUTE.EMPLOYEES);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const {
    data: userData,
    refetch: refetchUserData,
    loading: getUserInfoLoading,
  } = useQuery<GetUserResult>(GET_USER_INFO, {
    variables: {
      id: employeeId,
    },
    onCompleted: (data) => {
      if (data.user) {
        reset(resetEmployee(data.user));
      }
    },
    onError: (error) => {
      setError(error.message);
    },
    fetchPolicy: "network-only",
  });

  const refetchObservable = useRef(new Observable());

  const onSubmit: SubmitHandler<CreateUserInput> = (data) => {
    const {
      departmentId,
      positionId,
      cvsIds,
      profile: { first_name, last_name, languages = [], skills = [] },
    } = data.user;

    saveUser({
      variables: {
        id: employeeId,
        user: {
          departmentId,
          positionId,
          profile: {
            first_name,
            last_name,
            skills,
            languages,
          },
          cvsIds: cvsIds,
        },
      },
      update: userCacheUpdate(employeeId),
    });
  };

  const onCancel: React.MouseEventHandler = (e) => {
    navigate(ROUTE.EMPLOYEES);
  };

  const handleTryAgain = () => {
    refetchObservable.current.notify();
    refetchUserData({ variables: { id: employeeId } });
  };

  const checkIfOwnProfile = (data?: GetUserResult) => {
    return user$?.email === data?.user?.email;
  };

  return getUserInfoLoading || saveUserLoading ? (
    <Loader />
  ) : error ? (
    <InlineError
      message="Something went wrong when trying to fetch employee data"
      tryAgainFn={handleTryAgain}
    />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserDetailsInput
        onError={(error) => setError(error.message)}
        control={control}
        refetchObservable={refetchObservable.current}
      />
      <DynamicFieldsetGroupWrapper>
        <SkillsInput
          control={control}
          onError={(error) => setError(error.message)}
        />
        <LanguagesInput
          control={control}
          onError={(error) => setError(error.message)}
        />
      </DynamicFieldsetGroupWrapper>

      <DialogActions>
        <SaveButtonWithAdminAccess allowAccess={checkIfOwnProfile(userData)} />
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
});
