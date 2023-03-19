import { CvInput } from "@graphql/Cv/Cv.interface";
import { SubmitHandler } from "react-hook-form";

export type CvCreateInfoFormProps = {
  onSubmit: SubmitHandler<CvInput>;
  error?: string;
  users?: UsersNamesIdsData;
};

export interface UsersNamesIdsData {
  users: UserNameIds[];
}

export interface UserNameIds {
  id: string;
  profile: {
    full_name: string;
  };
}
