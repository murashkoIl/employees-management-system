import React, { useEffect, useRef, useState } from "react";
import { withOverlay } from "@hoc/withOverlay";
import { StyledDiv, StyledPattern, Img } from "./CvPatterns.styles";
import { PdfWrapperWithOverlay } from "@components/PdfWrapper/PdfWrapper";
import pattern1 from "@assets/images/pattern1.png";
import pattern2 from "@assets/images/pattern2.png";
import { usePdf } from "./CvPatterns.hooks";

const CvPatterns = () => {
  const { isPdfVisible, choosenPattern, patternRef, onPatternsClick, showPdf } =
    usePdf();

  return (
    <>
      <StyledDiv ref={patternRef} onClick={onPatternsClick}>
        <StyledPattern className="variant-1" onClick={showPdf}>
          <Img src={pattern1} alt="variant-1" />
        </StyledPattern>
        <StyledPattern className="variant-2" onClick={showPdf}>
          <Img src={pattern2} alt="variant-2" />
        </StyledPattern>
      </StyledDiv>
      {isPdfVisible && <PdfWrapperWithOverlay variant={choosenPattern} />}
    </>
  );
};

export const CvPatternsWithOverlay = withOverlay(CvPatterns);
