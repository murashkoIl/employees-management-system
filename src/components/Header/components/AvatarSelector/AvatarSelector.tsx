import { useMutation } from "@apollo/client";
import { Avatar, CircularProgress } from "@mui/material";
import { useErrorToast } from "@src/context/ErrorToastStore/ErrorToastStore";
import {
  DeleteAvatarInput,
  UploadAvatarInput,
  UploadAvatarResult,
} from "@src/graphql/Avatar/Avatar.interface";
import {
  DELETE_AVATAR,
  UPLOAD_AVATAR,
} from "@src/graphql/Avatar/Avatar.queries";
import { GET_ACCOUNT_INFO } from "@src/graphql/User/User.queries";
import { toBase64 } from "@src/helpers/toBase64";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { UserProfileContext } from "../UserProfile/UserProfile";
import {
  AvatarWrapper,
  PositionedAvatarDeleteIcon,
  StyledAccountCircleIcon,
} from "./AvatarSelector.styles";

const AvatarSelector = () => {
  const { user, updateProfile } = useContext(UserProfileContext);
  const [uploadAvatar] = useMutation<UploadAvatarResult, UploadAvatarInput>(
    UPLOAD_AVATAR,
    {
      onCompleted: (data) => {
        updateProfile("avatar", data.uploadAvatar);
      },
    },
  );

  const [deleteAvatar] = useMutation<void, DeleteAvatarInput>(DELETE_AVATAR, {
    onCompleted: (data) => {
      updateProfile("avatar", "");
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setToastError } = useErrorToast();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    if (e.target.files && user?.profile.id) {
      try {
        setIsLoading(true);
        const file = e.target.files[0];

        const base64 = await toBase64(file);

        await uploadAvatar({
          variables: {
            id: user?.profile.id,
            avatar: { size: file.size, type: file.type, base64 },
          },
        });

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setToastError("Something went wrong when uploading avatar");
      }
    }
  };

  const handleDelete: React.MouseEventHandler = async (e) => {
    if (user?.profile.id) {
      try {
        setIsLoading(true);

        await deleteAvatar({
          variables: {
            id: user?.profile.id,
          },
        });

        setIsLoading(false);
      } catch (err) {
        setToastError("Something went wrong when deleting avatar");
      }
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <AvatarWrapper>
      {user?.profile.avatar && (
        <PositionedAvatarDeleteIcon onClick={handleDelete} />
      )}
      <label htmlFor="avatar-upload">
        <input
          type="file"
          accept="image/*"
          id="avatar-upload"
          hidden={true}
          onChange={handleChange}
          disabled={isLoading}
        />
        <Avatar
          alt={user?.profile.full_name}
          src={user?.profile.avatar}
          sx={{ cursor: "pointer" }}
        />
      </label>
    </AvatarWrapper>
  );
};

export default observer(AvatarSelector);
