import { useQuery } from "@apollo/client";
import { Breadcrumb } from "@components/Breadcrumb";
import { CvInfoUpdate } from "@components/CvInfoUpdate";
import { InlineError } from "@components/InlineError";
import { Loader } from "@components/Loader";
import { PageTopTypography } from "@components/PageTopTypography";
import { PageBody } from "@components/styled/PageBody";
import { PageTop } from "@components/styled/PageTop";
import { PageWrapper } from "@components/styled/PageWrapper";
import { GET_CV_NAME } from "@graphql/Cv/Cv.queries";
import { useParams } from "react-router";

export const CvInfoUpdatePage = () => {
  const { cvId } = useParams();

  const { data, loading, error, refetch } = useQuery(GET_CV_NAME, {
    variables: { id: cvId },
  });

  const handleTryAgain = () => {
    refetch();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <InlineError message={error.message} tryAgainFn={handleTryAgain} />;
  }

  return (
    data.cv && (
      <PageWrapper>
        <PageTop>
          <Breadcrumb
            config={{
              cvs: "Cvs",
              [cvId!]: data.cv.name,
            }}
          />
          <PageTopTypography title="Cvs" caption={data.cv.name} />
        </PageTop>
        <PageBody>
          <CvInfoUpdate />
        </PageBody>
      </PageWrapper>
    )
  );
};
