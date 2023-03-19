import { Project } from "@src/interfaces/project.interface";
import { format } from "date-fns";

export const resetProject = (project: Project) => {
  return {
    internalName: project.internal_name || "",
    name: project.name || "",
    startDate: format(new Date(project.start_date), "MM/dd/yyyy") || "",
    endDate: project.end_date
      ? format(new Date(project.end_date), "MM/dd/yyyy")
      : "",
    domain: project.domain || "",
    description: project.description || "",
    teamSize: project.team_size || 0,
    techStack: project.tech_stack,
  };
};
