import { useMutation, useQuery } from "@apollo/client";
import { PageTopTypography } from "@components/PageTopTypography";
import { PageBody } from "@components/styled/PageBody";
import { PageTop } from "@components/styled/PageTop";
import { PageWrapper } from "@components/styled/PageWrapper";
import { createTable } from "@components/Table/Table";
import { DELETE_USER, GET_USERS } from "@graphql/User/User.queries";
import {
  DeleteUserResult,
  GetUsersResult,
  DeleteUserInput,
} from "@graphql/User/User.interface";
import { IEmployeeTable } from "@interfaces/IEmployee";
import { memo, useCallback, useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb";
import { TableEntry } from "../../constants/table";
import { getEmployees } from "./helpers";
import { deleteUserCacheUpdate } from "@graphql/User/User.cache";
import { Loader } from "@components/Loader";
import { InlineError } from "@components/InlineError";
import {
  mediumScreenTableHead,
  smallScreenTableHead,
  tableHead,
} from "./tableHead";
import { useModal } from "@hooks/useModal";
import { EmployeeInfoCreate } from "./pages/EmployeeInfo/components/EmployeeInfoCreate";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

const Table = memo(createTable<IEmployeeTable>());

export const EmployeesPage = () => {
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const isMediumScreenMatch = useMediaQuery("(max-width: 790px)");
  const isSmallScreenMatch = useMediaQuery("(max-width: 540px)");
  const [mountedDialog, openModal] = useModal(EmployeeInfoCreate);

  const { data, refetch, loading } = useQuery<GetUsersResult>(GET_USERS, {
    onError: (error) => {
      setError(error.message);
    },
  });

  const [deleteUser] = useMutation<DeleteUserResult, DeleteUserInput>(
    DELETE_USER,
    {
      optimisticResponse: {
        deleteUser: {
          affected: 1,
        },
      },
    },
  );

  const handleItemDelete = useCallback(
    (id: string) => {
      deleteUser({
        variables: { id },
        update: deleteUserCacheUpdate(id),
      });
    },
    [deleteUser],
  );

  const handleCreate = () => {
    openModal();
  };

  const handleTryAgain = () => {
    refetch();
  };

  return (
    <PageWrapper>
      {mountedDialog}
      <PageTop>
        <Breadcrumb
          config={{
            employees: t("employeesPage.title"),
          }}
        />
        <PageTopTypography
          title={t(`employeesPage.title`)}
          caption={t("employeesPage.employeesList")}
        />
      </PageTop>
      <PageBody>
        {loading ? (
          <Loader />
        ) : error ? (
          <InlineError
            message={t("errors.failedToFetchEmployeeData")}
            tryAgainFn={handleTryAgain}
          />
        ) : (
          data?.users && (
            <Table
              onDelete={handleItemDelete}
              onCreate={handleCreate}
              head={
                isSmallScreenMatch
                  ? smallScreenTableHead
                  : isMediumScreenMatch
                  ? mediumScreenTableHead
                  : tableHead
              }
              items={getEmployees(data.users)}
              redirectButtonText={t("buttons.profile")}
              deleteButtonText={t("buttons.delete")}
              entryType={TableEntry.EMPLOYEE}
              showNewEntryButton={true}
              searchBy="name"
            />
          )
        )}
      </PageBody>
    </PageWrapper>
  );
};
