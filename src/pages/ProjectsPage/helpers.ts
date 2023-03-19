import { IProjectTable } from "@interfaces/IProject";
import { Project } from "@src/interfaces/project.interface";

export function getProjects(projects: Project[]): IProjectTable[] {
  return projects.map((project) => ({
    id: project.id,
    name: project.name || "-",
    internalName: project.internal_name || "-",
    startDate: project.start_date,
    endDate: project.end_date || "Till now",
  }));
}
