import { Breadcrumb } from "@components/Breadcrumb";
import { PageTop } from "@components/styled/PageTop";
import { PageBody } from "@components/styled/PageBody";
import { PageTopTypography } from "@components/PageTopTypography";
import { Stack } from "@mui/material";
import { Outlet, useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_NAME } from "@graphql/Project/Project.queries";
import { ProjectName } from "@graphql/Project/Project.interface";
import { useState } from "react";
import { Loader } from "@components/Loader";

export const ProjectPage = () => {
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const { data } = useQuery<ProjectName>(GET_PROJECT_NAME, {
    variables: {
      id: projectId,
    },
    onCompleted: (data) => {
      setIsLoading(false);
    },
  });

  return (
    <Stack sx={{ width: "100%" }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PageTop>
            <Breadcrumb
              config={{
                info: "Info",
                cv: "CV",
                projects: "Projects",
              }}
            />

            <PageTopTypography
              title="Projects"
              caption={`Project: ${data?.project.name}`}
            />
          </PageTop>
          <PageBody>
            <Outlet />
          </PageBody>
        </>
      )}
    </Stack>
  );
};
