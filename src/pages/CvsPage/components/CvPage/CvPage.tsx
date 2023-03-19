import { Breadcrumb } from "@components/Breadcrumb";
import { PageTopTypography } from "@components/PageTopTypography";
import { PageTop } from "@components/styled/PageTop";
import { CvInfoUpdatePage } from "../../../CvInfoUpdatePage";
import { Container } from "./CvPage.styles";

export const CvPage = () => {
  return (
    <Container>
      <PageTop>
        <Breadcrumb />
        <PageTopTypography title="CV" caption="Cv name" />
      </PageTop>
      <CvInfoUpdatePage />
    </Container>
  );
};
