import { Project } from "@interfaces/project.interface";
import { Dispatch, SetStateAction } from "react";

export type ProjectsProviderProps = {
  children: React.ReactNode;
};

export interface IProjectsContext {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
}
