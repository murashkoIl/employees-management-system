import { IconButton, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Close from "@mui/icons-material/Close";
import { forwardRef, ReactElement, Ref, useCallback, useState } from "react";
import { StyledDialog } from "@components/styled/StyledDialog";
import { AssignCvFormProps } from "@components/AssignCvForm/AssignCvForm.types";
import { EmployeeInfoCreateProps } from "@src/pages/EmployeesPage/pages/EmployeeInfo/components/EmployeeInfoCreate/EmployeeInfoCreate.types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

export const useModal = <T,>(
  Component: React.ComponentType<T | AssignCvFormProps>,
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
