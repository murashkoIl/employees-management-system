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
import { memo, useCallback, useEffect, useState } from "react";
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

const Table = memo(createTable<IEmployeeTable>());

export const EmployeesPage = () => {
  const [error, setError] = useState("");
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
            employees: "Employees",
          }}
        />
        <PageTopTypography title="Employees" caption="Employees list" />
      </PageTop>
      <PageBody>
        {loading ? (
          <Loader />
        ) : error ? (
          <InlineError
            message="Something went wrong when trying to fetch employees data"
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
              redirectButtonText="Profile"
              deleteButtonText="Delete"
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
