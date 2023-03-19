import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CVS_NAMES } from "@graphql/Cv/Cv.queries";
import { CvsNamesData } from "@graphql/Cv/Cv.interface";
import { StyledDiv, StyledWrapper } from "./AssignCvForm.styles";
import {
  GetUserResult,
  UpdateUserInput,
  UpdateUserResult,
} from "@graphql/User/User.interface";
import { GET_USER_INFO, UPDATE_USER } from "@graphql/User/User.queries";
import { userCacheUpdate } from "@graphql/User/User.cache";
import { Loader } from "../Loader";
import { InlineError } from "../InlineError";
import { AssignCvFormProps } from "./AssignCvForm.types";
import { useParams } from "react-router";

export const AssignCvForm = ({ closeModal, userInfo }: AssignCvFormProps) => {
  const [error, setError] = useState("");
  const { employeeId } = useParams();

  const [saveUser, { loading: saveUserLoading }] = useMutation<
    UpdateUserResult,
    UpdateUserInput
  >(UPDATE_USER, {
    onCompleted: (data) => {
      closeModal && closeModal();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const { data: userData, loading } = useQuery<GetUserResult>(GET_USER_INFO, {
    variables: { id: employeeId },

    onError: (err) => {
      setError(err.message);
    },
  });

  const { data: cvInfoNames, loading: isCvInfoLoading } =
    useQuery<CvsNamesData>(GET_CVS_NAMES);

  const handleCvClick = useCallback((e: React.SyntheticEvent) => {
    if (userData && employeeId) {
      const cvsIds = userData.user.cvs.map((cv) => cv.id);

      saveUser({
        variables: {
          id: userData.user.id,
          user: {
            departmentId: userData.user.department?.id || "",
            positionId: userData.user.position?.id || "",
            profile: {
              first_name: userData.user.profile?.first_name || "",
              last_name: userData.user.profile?.last_name || "",
              skills: userData.user.profile?.skills,
              languages: userData.user.profile?.languages,
            },
            cvsIds: [...cvsIds, (e.target as Element).id],
          },
        },
        update: userCacheUpdate(employeeId),
      });
    }
  }, []);

  return isCvInfoLoading || saveUserLoading ? (
    <Loader />
  ) : error ? (
    <InlineError message="Something went wrong when trying to fetch employee data" />
  ) : (
    <StyledWrapper>
      {cvInfoNames?.cvs.map(({ name, id }) => (
        <StyledDiv id={id} onClick={handleCvClick} key={id}>
          {name}
        </StyledDiv>
      ))}
    </StyledWrapper>
  );
};
