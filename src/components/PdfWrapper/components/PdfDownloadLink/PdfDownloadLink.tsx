import { BlobProvider } from "@react-pdf/renderer";
import { PdfViewer } from "../PdfViewer";
import { PdfViewerProps } from "../PdfViewer/PdfViewer.types";
import { StyledLink } from "./PdfDownloadLink.styles"; 

export const PdfDownloadLink = ({ data, variant }: PdfViewerProps) => {
  return (
    <div>
      <BlobProvider document={<PdfViewer variant={variant} data={data} />}>
        {({ blob }) => {
          const downloadURL = URL.createObjectURL(
            new Blob([blob || ""], { type: "text/plain" }),
          );
          return (
            blob && (
              <StyledLink href={downloadURL} download="CV.pdf">
                Download
              </StyledLink>
            )
          );
        }}
      </BlobProvider>
    </div>
  );
};
