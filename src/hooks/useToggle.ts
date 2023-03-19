import { useState } from "react";

export const useToggle = (
  isToggled: boolean,
): [boolean, () => void, () => void, () => void] => {
  const [isOn, setIsOn] = useState(isToggled);

  const on = () => setIsOn(true);
  const off = () => setIsOn(false);
  const toggle = () => setIsOn((prev) => !prev);

  return [isOn, on, off, toggle];
};
