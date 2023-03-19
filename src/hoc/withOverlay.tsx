import { StyledOverlayDiv } from "@components/styled/Overlay";
import { PdfWrapperProps } from "@components/PdfWrapper/PdfWrapper.types";

export const withOverlay =
  <T extends {}>(Component: React.ComponentType<T>) =>
  (props: T & PdfWrapperProps) => {
    return (
      <StyledOverlayDiv onClick={props.onClose}>
        <Component {...props} />
      </StyledOverlayDiv>
    );
  };
