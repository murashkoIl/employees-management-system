/* Queries */

import { Project } from "@interfaces/project.interface";

export interface ProjectsData {
  projects: Project[];
}

export interface ProjectInfoData {
  project: Project;
}

export interface ProjectName {
  project: {
    name: string;
  };
}

/* Mutations */

export interface CreateProjectInput {
  project: ProjectInput;
}

export interface CreateProjectOutput {
  createProject: {
    id: string;
    project: ProjectInput;
    affected: number;
  };
}

export interface DeleteProjectInput {
  id: string;
}

export interface DeleteProjectOutput {
  deleteProject: {
    affected: number;
  };
}

export interface UpdateProjectInput {
  id: string;
  project: ProjectInput;
}

export interface UpdateProjectOutput {
  updateProject: Project;
}

/* Parts */

export interface ProjectInput {
  name: string;
  internal_name: string;
  description: string;
  domain: string;
  start_date: string;
  end_date: string | null;
  team_size: number;
  skillsIds: string[];
}

/* For table */

export interface ProjectTable {
  id: string;
  internal_name: string;
  start_date: string;
  end_date: string;
}
