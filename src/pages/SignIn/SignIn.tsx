import { useCallback, useState } from "react";
import { Fieldset } from "@components/Fieldset";
import { InfoFormWrapper } from "@components/styled/InfoFormWrapper";
import { IAuth, ISignIn } from "@interfaces/IAuth";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import logoBlack from "@assets/images/logoBlack.svg";
import {
  AuthImg,
  AuthStyledForm,
  AuthAdditionalInfoWrapper,
  AuthLoaderWrapper,
  InvalidInputError,
} from "@components/styled/auth-styles/Auth.styles";
import { useNavigate } from "react-router";
import { ROUTE } from "@constants/route";
import { useLazyQuery } from "@apollo/client";
import {
  AuthInputData,
  AuthSigninOutputData,
} from "@graphql/Auth/Auth.interface";
import { SIGNIN } from "@graphql/Auth/Auth.queries";
import { Loader } from "@components/Loader";
import { authStore } from "@src/stores/AuthStore/AuthStore";

export const SignIn = () => {
  const [isMemorized, setIsMemorized] = useState(false);
  const [error, setError] = useState("");

  const { login } = authStore;

  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<ISignIn>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMemorized(e.target.checked);
  };

  const [signin, { loading }] = useLazyQuery<
    AuthSigninOutputData,
    AuthInputData
  >(SIGNIN, {
    onCompleted: (data) => {
      login(data.login, isMemorized);
      navigate(ROUTE.EMPLOYEES);
    },
    onError: (error) => {
      reset();
      setError(error.message);
    },
  });

  const onSubmit: SubmitHandler<IAuth> = useCallback(
    ({ email, password }) => {
      signin({
        variables: {
          auth: {
            email,
            password,
          },
        },
      });
    },
    [signin],
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
            <AuthAdditionalInfoWrapper>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isMemorized}
                    onChange={handleCheckboxChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Remember me"
              />
            </AuthAdditionalInfoWrapper>
            <Button type="submit" fullWidth variant="contained">
              Login
            </Button>
          </AuthStyledForm>
        </>
      )}
    </>
  );
};
