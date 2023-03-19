import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Project } from "@interfaces/project.interface";
import { Controller, FieldValues } from "react-hook-form";
import { ErrorToast } from "../ErrorToast";
import { Loader } from "../Loader";
import { AutocompleteWrapper } from "./ProjectAutocomplete.styles";
import { ProjectAutocompleteProps } from "./ProjectAutocomplete.types";

export const ProjectAutocomplete = <T extends FieldValues>({
  control,
  name,
  projects,
  existingProjects,
  error,
  isLoading,
  defaultValue,
}: ProjectAutocompleteProps<T>) => {
  const [values, setValues] = useState<Project[]>(existingProjects);

  useEffect(() => {
    setValues(existingProjects);
  }, [existingProjects]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorToast message={error} />
      ) : (
        <AutocompleteWrapper>
          <Controller
            name={name}
            control={control}
            render={({ field: { ref, onChange, ...field } }) => {
              return (
                <Autocomplete
                  multiple
                  id="tags-projects"
                  value={values}
                  options={projects.projects}
                  getOptionLabel={(project) => project.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(e: React.SyntheticEvent, data: Project[]) => {
                    setValues(data);
                    onChange(data.map((project: Project) => project.id));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      inputRef={ref}
                      variant="standard"
                      label="Projects"
                      placeholder=""
                    />
                  )}
                />
              );
            }}
          />
        </AutocompleteWrapper>
      )}
    </>
  );
};
