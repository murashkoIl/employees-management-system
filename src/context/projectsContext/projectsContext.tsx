import { Project } from "@interfaces/project.interface";
import { createContext, useState } from "react";
import {
  IProjectsContext,
  ProjectsProviderProps,
} from "./projectsContext.types";

const ProjectsContext = createContext({} as IProjectsContext);

const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContext, ProjectsProvider };
