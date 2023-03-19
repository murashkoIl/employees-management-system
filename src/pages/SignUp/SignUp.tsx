import { Fieldset } from "@components/Fieldset";
import { InfoFormWrapper } from "@components/styled/InfoFormWrapper";
import { IAuth } from "@interfaces/IAuth";
import { Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import logoBlack from "@assets/images/logoBlack.svg";
import {
  AuthImg,
  AuthLoaderWrapper,
  AuthStyledForm,
  InvalidInputError,
} from "@components/styled/auth-styles/Auth.styles";
import { useCallback, useState } from "react";
import {
  AuthInputData,
  AuthSignupOutputData,
} from "@graphql/Auth/Auth.interface";
import { SIGNUP } from "@graphql/Auth/Auth.queries";
import { useMutation } from "@apollo/client";
import { ROUTE } from "@constants/route";
import { useNavigate } from "react-router";
import { Loader } from "@components/Loader";
import { createUserCacheUpdate } from "@graphql/Auth/Auth.cache";
import { ERRORS } from "@constants/errors";
import { authStore } from "@src/stores/AuthStore/AuthStore";

export const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { login } = authStore;

  const { control, handleSubmit, reset } = useForm<IAuth>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [signup, { loading }] = useMutation<
    AuthSignupOutputData,
    AuthInputData
  >(SIGNUP, {
    onCompleted: (data) => {
      login(data.signup, false);
      navigate(ROUTE.EMPLOYEES);
    },
    onError: (error) => {
      reset();
      if (error.message.includes("duplicate key")) {
        setError(ERRORS.EMAIL_TAKEN);
      } else {
        setError(error.message);
      }
    },
  });

  const onSubmit: SubmitHandler<IAuth> = useCallback(
    (data) => {
      signup({
        variables: {
          auth: {
            email: data.email,
            password: data.password,
          },
        },
        update: createUserCacheUpdate(),
      });
    },
    [signup],
  );

  return (
    <>
      {loading ? (
        <AuthLoaderWrapper>
          <Loader />
        </AuthLoaderWrapper>
      ) : (
        <>
          <AuthImg src={logoBlack} alt="logo" />
          <AuthStyledForm onSubmit={handleSubmit(onSubmit)}>
            <InfoFormWrapper>
              <Fieldset
                isFullWidth={true}
                inputWidth="100%"
                required="Please, specify the field"
                label="Email"
                control={control}
                name="email"
              />
            </InfoFormWrapper>
            <InfoFormWrapper>
              <Fieldset
                isFullWidth={true}
                inputWidth="100%"
                required="Please, specify the field"
                label="Password"
                control={control}
                name="password"
                type="password"
              />
            </InfoFormWrapper>
            {error && <InvalidInputError>{error}</InvalidInputError>}
            <Button type="submit" fullWidth variant="contained">
              Sign Up
            </Button>
          </AuthStyledForm>
        </>
      )}
    </>
  );
};
