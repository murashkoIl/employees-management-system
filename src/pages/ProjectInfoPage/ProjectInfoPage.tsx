import { ProjectInfoUpdate } from "@components/ProjectInfo/components/ProjectInfoUpdate";
import { useParams } from "react-router";

export const ProjectInfoPage = () => {
  const { projectId } = useParams();
  return <ProjectInfoUpdate projectId={projectId || ""} />;
};
