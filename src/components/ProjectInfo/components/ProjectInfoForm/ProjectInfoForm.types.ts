import { ApolloError } from "@apollo/client";
import { ProjectInfoData } from "@graphql/Project/Project.interface";
import { IProject } from "@interfaces/IProject";
import { SubmitHandler } from "react-hook-form";

export type ProjectInfoFormProps = {
  onSubmit: SubmitHandler<IProject>;
  onError: (error: ApolloError) => void;
  data?: ProjectInfoData;
};
