import { Breadcrumb } from "@components/Breadcrumb";
import { PageTopTypography } from "@components/PageTopTypography";
import { PageBody } from "@components/styled/PageBody";
import { PageTop } from "@components/styled/PageTop";
import { PageWrapper } from "@components/styled/PageWrapper";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";

export function EntitiesPage() {
  const { t } = useTranslation();
  return (
    <PageWrapper>
      <PageTop>
        <Breadcrumb
          config={{
            entities: t("entitiesPage.title"),
            languages: t("entitiesPage.entities.languages"),
            skills: t("entitiesPage.entities.skills"),
            departments: t("entitiesPage.entities.departments"),
            positions: t("entitiesPage.entities.positions"),
          }}
        />
        <PageTopTypography
          title={t("entitiesPage.title")}
          caption={t("entitiesPage.entitiesList")}
        />
      </PageTop>
      <PageBody>
        <Outlet />
      </PageBody>
    </PageWrapper>
  );
}
