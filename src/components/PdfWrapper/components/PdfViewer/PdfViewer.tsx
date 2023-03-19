import { Document } from "@react-pdf/renderer";
import { PDFVariants } from "@src/constants/pdfVariants";
import { PdfViewerPattern1 } from "../PdfViewerPatterns/PdfViewerPattern1";
import { PdfViewerPattern2 } from "../PdfViewerPatterns/PdfViewerPattern2";
import { PdfViewerProps } from "./PdfViewer.types";

export const PdfViewer = ({ data, variant }: PdfViewerProps) => {
  const handlePDFVariant = (variant: string) => {
    switch (variant) {
      case PDFVariants.VARIANT_1:
        return <PdfViewerPattern1 data={data} />;
      case PDFVariants.VARIANT_2:
      default: {
        return <PdfViewerPattern2 data={data} />;
      }
    }
  };

  return <Document>{variant && handlePDFVariant(variant)}</Document>;
};
