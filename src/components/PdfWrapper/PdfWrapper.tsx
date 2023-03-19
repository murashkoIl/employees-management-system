import { PdfDownloadLink } from "./components/PdfDownloadLink";
import { PdfViewer } from "./components/PdfViewer";
import { StyledDiv } from "./PdfWrapper.styles";
import { PDFViewer } from "@react-pdf/renderer";
import { withOverlay } from "@hoc/withOverlay";
import { useQuery } from "@apollo/client";
import { GET_FULL_CV_INFO } from "@graphql/Cv/Cv.queries";
import { useParams } from "react-router";
import { CvFullInfo } from "@graphql/Cv/Cv.interface";
import { useState } from "react";
import { ErrorToast } from "../ErrorToast";
import { PdfWrapperProps } from "./PdfWrapper.types";

export function PdfWrapper({ variant }: PdfWrapperProps) {
  const { cvId } = useParams();
  const [error, setError] = useState("");
  const { data } = useQuery<CvFullInfo>(GET_FULL_CV_INFO, {
    variables: {
      id: cvId,
    },
    onError: (error) => {
      setError(error.message);
    },
  });  

  return (
    <>
      {error ? (
        <ErrorToast message={error} />
      ) : (
        data && (
          <StyledDiv>
            <PDFViewer>
              <PdfViewer variant={variant} data={data.cv} />
            </PDFViewer>
            <PdfDownloadLink variant={variant} data={data.cv} />
          </StyledDiv>
        )
      )}
    </>
  );
}

export const PdfWrapperWithOverlay = withOverlay(PdfWrapper);
