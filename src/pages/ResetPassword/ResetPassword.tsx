import { Fieldset } from "@components/Fieldset";
import { InfoFormWrapper } from "@components/styled/InfoFormWrapper";
import { ROUTE } from "@constants/route";
import { IResetPassword } from "@interfaces/IAuth";
import { Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logoBlack from "@assets/images/logoBlack.svg";
import {
  AuthWrapper,
  AuthFlexContainer,
  AuthImg,
  AuthStyledForm,
  AuthAdditionalInfoWrapper,
} from "@components/styled/auth-styles/Auth.styles";
import { useCallback } from "react";

export const ResetPassword = () => {
  const { control, handleSubmit } = useForm<IResetPassword>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IResetPassword> = useCallback((data) => {
    // TODO: checked === true ? remember user and sign in : sign in
    // navigate to employees
  }, []);

  return (
    <AuthWrapper>
      <AuthFlexContainer>
        <AuthImg src={logoBlack} alt="logo" />
        <AuthStyledForm onSubmit={handleSubmit(onSubmit)}>
          <InfoFormWrapper>
            <Fieldset
              isFullWidth={true}
              inputWidth="100%"
              required={"Please, specify the field"}
              label="Email"
              control={control}
              name="email"
            />
          </InfoFormWrapper>
          <AuthAdditionalInfoWrapper>
            <Link to={ROUTE.SIGN_IN}>
              <Typography>Sign In</Typography>
            </Link>
          </AuthAdditionalInfoWrapper>
          <Button type="submit" fullWidth variant="contained">
            Reset Password
          </Button>
        </AuthStyledForm>
        <AuthAdditionalInfoWrapper>
          <Typography marginRight="0.5em">Need an account?</Typography>
          <Link to={ROUTE.SIGN_UP}>Sign Up</Link>
        </AuthAdditionalInfoWrapper>
      </AuthFlexContainer>
    </AuthWrapper>
  );
};
