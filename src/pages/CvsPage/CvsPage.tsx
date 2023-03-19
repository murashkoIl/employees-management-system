import { Breadcrumb } from "@components/Breadcrumb";
import { PageTopTypography } from "@components/PageTopTypography";
import { PageBody } from "@components/styled/PageBody";
import { PageTop } from "@components/styled/PageTop";
import { PageWrapper } from "@components/styled/PageWrapper";
import { createTable } from "@components/Table/Table";
import { TableEntry } from "@constants/table";
import { DELETE_CV, GET_ALL_CVS } from "@graphql/Cv/Cv.queries";
import {
  CvsData,
  DeleteCvInput,
  DeleteCvOutput,
} from "@graphql/Cv/Cv.interface";
import { ICVTable } from "@interfaces/ICV";
import { useMutation, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { deleteCvCacheUpdate } from "@graphql/Cv/Cv.cache";
import { Loader } from "@components/Loader";
import { InlineError } from "@components/InlineError";
import { useErrorToast } from "@context/ErrorToastStore/ErrorToastStore";
import { tableHead } from "./tableHead";
import { useModal } from "@src/hooks/useModal";
import { CvInfoCreatePage } from "./components/CvInfoCreatePage";

const Table = createTable<ICVTable>();

export const CvsPage = () => {
  const [error, setError] = useState("");
  const [mountedDialog, openModal] = useModal(CvInfoCreatePage);

  const { data, refetch, loading } = useQuery<CvsData>(GET_ALL_CVS, {
    onError: (error) => {
      setError(error.message);
    },
  });

  const { setToastError } = useErrorToast();

  const [deleteCv] = useMutation<DeleteCvOutput, DeleteCvInput>(DELETE_CV, {
    onError: (error) => {
      setToastError(error.message);
    },
  });

  const handleItemDelete = useCallback(
    (id: string) => {
      deleteCv({
        variables: { id },
        update: deleteCvCacheUpdate(id),
        optimisticResponse: {
          deleteCv: {
            affected: 1,
          },
        },
      });
    },
    [deleteCv],
  );

  const handleTryAgain = () => {
    refetch();
  };

  const handleCreate = () => {
    openModal();
  };

  return (
    <PageWrapper>
      <>
        {mountedDialog}
        <PageTop>
          <Breadcrumb
            config={{
              cvs: "Cvs",
            }}
          />
          <PageTopTypography title="CVs" caption="Cvs list" />
        </PageTop>
        <PageBody>
          {loading ? (
            <Loader />
          ) : error ? (
            <InlineError
              message="Something went wrong when trying to fetch cvs data"
              tryAgainFn={handleTryAgain}
            />
          ) : (
            data?.cvs && (
              <Table
                onDelete={handleItemDelete}
                onCreate={handleCreate}
                head={tableHead}
                items={data.cvs}
                redirectButtonText="CV details"
                deleteButtonText="Delete"
                entryType={TableEntry.CV}
                showNewEntryButton={true}
                searchBy="name"
              />
            )
          )}
        </PageBody>
      </>
    </PageWrapper>
  );
};
