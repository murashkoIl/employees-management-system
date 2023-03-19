import { useParams } from "react-router";
import { EmployeeInfo } from "../EmployeeInfo/EmployeeInfo";

export const EmployeeInfoPage = () => {
  const { employeeId } = useParams();
  return <EmployeeInfo employeeId={employeeId || ""} />;
};
