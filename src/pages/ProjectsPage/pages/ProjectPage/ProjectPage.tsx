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
import { useTranslation } from "react-i18next";

export const ProjectPage = () => {
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

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
                projects: t("projectsPage.title"),
              }}
            />

            <PageTopTypography
              title={t("projectsPage.title")}
              caption={`${t("projectsPage.title")}: ${data?.project.name}`}
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
