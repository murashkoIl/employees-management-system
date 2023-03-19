import { IconButton, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Close from "@mui/icons-material/Close";
import { forwardRef, ReactElement, Ref, useCallback, useState } from "react";
import { StyledDialog } from "@components/styled/StyledDialog";
import { AssignCvFormProps } from "@components/AssignCvForm/AssignCvForm.types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const useModal = <T,>(
  Component: React.ComponentType<AssignCvFormProps>,
): [JSX.Element, () => void, () => void] => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return [
    <StyledDialog
      TransitionComponent={Transition}
      open={isModalOpen}
      onClose={closeModal}
    >
      <IconButton
        edge="start"
        color="inherit"
        onClick={closeModal}
        aria-label="close"
        style={{ position: "absolute", zIndex: 100, right: 0, top: 0 }}
      >
        <Close />
      </IconButton>
      <Component closeModal={closeModal} />
    </StyledDialog>,
    openModal,
    closeModal,
  ];
};
