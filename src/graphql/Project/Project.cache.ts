import { CacheUpdaterFunction } from "src/types";
import {
  CreateProjectInput,
  CreateProjectOutput,
  DeleteProjectInput,
  DeleteProjectOutput,
  ProjectsData,
  UpdateProjectInput,
  UpdateProjectOutput,
} from "./Project.interface";
import { GET_PROJECTS } from "./Project.queries";

export const deleteProjectCacheUpdate =
  (id: string): CacheUpdaterFunction<DeleteProjectOutput, DeleteProjectInput> =>
  (cache, { data }) => {
    const existingProjects = cache.readQuery<ProjectsData>({
      query: GET_PROJECTS,
    });

    if (existingProjects && data?.deleteProject.affected) {
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: existingProjects.projects.filter(
            (project) => project.id !== id,
          ),
        },
      });
    }
  };

export const createProjectCacheUpdate =
  (): CacheUpdaterFunction<CreateProjectOutput, CreateProjectInput> =>
  (cache, { data }) => {
    const existingProjects = cache.readQuery<ProjectsData>({
      query: GET_PROJECTS,
    });

    if (existingProjects) {
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [data?.createProject.project, ...existingProjects.projects],
        },
      });
    }
  };

export const projectCacheUpdate =
  (id: string): CacheUpdaterFunction<UpdateProjectOutput, UpdateProjectInput> =>
  (cache, { data }) => {
    const existingProjects = cache.readQuery<ProjectsData>({
      query: GET_PROJECTS,
    });

    if (existingProjects) {
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [
            ...existingProjects.projects.filter((project) => project.id !== id),
            data?.updateProject,
          ],
        },
      });
    }
  };
