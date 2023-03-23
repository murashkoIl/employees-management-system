import { useMutation, useQuery } from "@apollo/client";
import { ROUTE } from "@constants/route";
import {
  CreateUserInput,
  CreateUserResult,
} from "@graphql/User/User.interface";
import { CREATE_USER } from "@graphql/User/User.queries";
import { IEmployeeCore } from "@interfaces/IEmployee";
import { createUserCacheUpdate } from "@graphql/User/User.cache";
import { useCallback, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { EmployeeCreateInfoForm } from "../EmployeeCreateInfoForm";
import { Loader } from "@components/Loader";
import { PositionsNamesIdsData } from "@graphql/Entity/Position/Position.interface";
import { GET_POSITIONS_NAMES_IDS } from "@graphql/Entity/Position/Position.queries";
import { GET_DEPARTMENTS } from "@graphql/Entity/Department/Department.queries";
import { GetDepartmentsData } from "@graphql/Entity/Department/Department.interface";
import { modalObserver } from "@src/helpers/observer";

export const EmployeeInfoCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { data: departments } = useQuery<GetDepartmentsData>(GET_DEPARTMENTS, {
    onError: (error) => {
      setError(error.message);
    },
  });

  const { data: positions } = useQuery<PositionsNamesIdsData>(
    GET_POSITIONS_NAMES_IDS,
    {
      onError: (error) => {
        setError(error.message);
      },
    },
  );

  const [createUser, { loading: createCvLoading }] = useMutation<
    CreateUserResult,
    CreateUserInput
  >(CREATE_USER, {
    onCompleted: () => {
      modalObserver.notify();
      navigate(ROUTE.EMPLOYEES);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onSubmit: SubmitHandler<IEmployeeCore> = useCallback(
    (data) => {
      createUser({
        variables: {
          user: {
            auth: {
              email: data.auth.email,
              password: data.auth.password,
            },
            profile: {
              first_name: data.profile.first_name,
              last_name: data.profile.last_name,
              skills: [],
              languages: [],
            },
            cvsIds: [],
            departmentId: data.profile.departmentId,
            positionId: data.profile.positionId,
            role: data.profile.role || "employee",
          },
        },
        update: createUserCacheUpdate(),
      });
    },
    [createUser],
  );

  return createCvLoading ? (
    <Loader />
  ) : (
    <EmployeeCreateInfoForm
      positions={positions?.positions}
      departments={departments?.departments}
      error={error}
      onSubmit={onSubmit}
    />
  );
};
