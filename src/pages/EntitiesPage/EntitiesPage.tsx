import { Breadcrumb } from "@components/Breadcrumb";
import { PageTopTypography } from "@components/PageTopTypography";
import { PageBody } from "@components/styled/PageBody";
import { PageTop } from "@components/styled/PageTop";
import { PageWrapper } from "@components/styled/PageWrapper";
import { Outlet } from "react-router";

export function EntitiesPage() {
  return (
    <PageWrapper>
      <PageTop>
        <Breadcrumb
          config={{
            entities: "Entities",
          }}
        />
        <PageTopTypography title="Entities" caption="Entities list" />
      </PageTop>
      <PageBody>
        <Outlet />
      </PageBody>
    </PageWrapper>
  );
}
