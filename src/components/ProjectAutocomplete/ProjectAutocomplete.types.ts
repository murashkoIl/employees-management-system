import { ProjectsData } from "@graphql/Project/Project.interface";
import { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Project } from "@interfaces/project.interface";

export type ProjectAutocompleteProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  projects: ProjectsData;
  existingProjects: Project[];
  error: string;
  isLoading: boolean;
  defaultValue: any;
};
