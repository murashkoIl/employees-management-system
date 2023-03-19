import { FormSaveButtonProps } from "@components/FormSaveButton/FormSaveButton.types";
import { UserRoles } from "@src/constants/user-roles.constants";
import { authStore } from "@src/stores/AuthStore/AuthStore";

export const withAdminAccess =
  <T extends {}>(Component: React.ComponentType<T>) =>
  (props: T & FormSaveButtonProps) => {
    const { user$ } = authStore;

    return (
      <>
        {user$?.role === UserRoles.Admin || props?.allowAccess ? (
          <Component {...props} />
        ) : (
          <></>
        )}
      </>
    );
  };
