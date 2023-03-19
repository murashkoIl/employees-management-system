import { ApolloError } from "@apollo/client";
import {
  CreateUserInput,
  GetUserResult,
} from "@src/graphql/User/User.interface";
import { Control } from "react-hook-form";
import { Observable } from "../../Observable";

export type UserDetailsInputProps = {
  onError: (error: ApolloError) => void;
  control: Control<CreateUserInput>;
  refetchObservable: Observable;
};
