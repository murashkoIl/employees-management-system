import { useRef, useState } from "react";
import { PDFVariants } from "@constants/pdfVariants";

export const usePdf = () => {
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  const [choosenPattern, setChoosenPattern] = useState("");
  const patternRef = useRef<HTMLDivElement>(null);
  const onPatternsClick = (e: React.MouseEvent<HTMLElement>) => {
    patternRef?.current?.classList.add("hidden");
    e.stopPropagation();
  };

  const showPdf = (e: React.SyntheticEvent) => {
    if (e.currentTarget.classList.value.includes("variant-1")) {
      setChoosenPattern(PDFVariants.VARIANT_1);
    } else {
      setChoosenPattern(PDFVariants.VARIANT_2);
    }
    setIsPdfVisible(true);
  };

  return {
    isPdfVisible,
    choosenPattern,
    patternRef,
    onPatternsClick,
    showPdf,
  };
};
