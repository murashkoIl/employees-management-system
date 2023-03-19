import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CvsPage } from "@pages/CvsPage";
import { EmployeesPage } from "@pages/EmployeesPage/";
import { EntitiesPage } from "@pages/EntitiesPage";
import { NotFoundPage } from "@pages/NotFoundPage";
import { ProjectsPage } from "@pages/ProjectsPage";
import { RedirectPage } from "@pages/RedirectPage";
import { Layout } from "../Layout";
import { EmployeePage } from "@pages/EmployeesPage/pages/EmployeePage";
import { EmployeeCv } from "@pages/EmployeesPage/pages/EmployeeCv";
import { ENTITY, ROUTE, ROUTE_PARAM } from "@constants/route";
import { EmployeeInfoPage } from "@pages/EmployeesPage/pages/EmployeeInfoPage";
import { ProjectPage } from "@pages/ProjectsPage/pages/ProjectPage";
import { ProjectInfoPage } from "@pages/ProjectInfoPage";
import { SignIn } from "@pages/SignIn";
import { SignUp } from "@pages/SignUp";
import { Auth } from "@pages/Auth";
import { CvInfoUpdatePage } from "@pages/CvInfoUpdatePage";
import { EntitiesList } from "@pages/EntitiesPage/pages/EntitiesList";
import { LanguagesPage } from "@pages/EntitiesPage/pages/LanguagesPage";
import { SkillsPage } from "@pages/EntitiesPage/pages/SkillsPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { authGuard, roleGuard } from "@helpers/guard";
import { ROLES } from "@constants/roles";
import { DepartmentsPage } from "@pages/EntitiesPage/pages/DepartmentsPage";
import { PositionsPage } from "@pages/EntitiesPage/pages/PositionsPage";
import { CvInfoUpdate } from "../CvInfoUpdate";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Auth />}>
          <Route path={ROUTE.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTE.SIGN_UP} element={<SignUp />} />
        </Route>

        <Route path={ROUTE.EMPTY} element={<Layout />}>
          <Route
            element={
              <ProtectedRoute
                guards={[authGuard]}
                fallback={() => <RedirectPage to={ROUTE.SIGN_IN} />}
                path={ROUTE.EMPLOYEES}
              />
            }
          >
            <Route index element={<RedirectPage to={ROUTE.EMPLOYEES} />} />
            <Route path={ROUTE.EMPLOYEES} element={<EmployeesPage />} />
            <Route path={ROUTE.TARGET_EMPLOYEE} element={<EmployeePage />}>
              <Route index element={<EmployeeInfoPage />} />
              <Route path={ROUTE.TARGET_EMPLOYEE_CV} element={<EmployeeCv />}>
                <Route path={ROUTE_PARAM.CV_ID} element={<CvInfoUpdate />} />
              </Route>
            </Route>
            <Route path={ROUTE.PROJECTS} element={<ProjectsPage />} />
            <Route path={ROUTE.TARGET_PROJECT} element={<ProjectPage />}>
              <Route index element={<ProjectInfoPage />} />
            </Route>
            <Route path={ROUTE.CVS} element={<CvsPage />} />
            <Route path={ROUTE.TARGET_CV} element={<CvInfoUpdatePage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                guards={[roleGuard([ROLES.ADMIN])]}
                fallback={() => <RedirectPage to={ROUTE.ANY_OTHER} />}
              />
            }
          >
            <Route index element={<RedirectPage to={ROUTE.ENTITIES} />} />
            <Route path={ROUTE.ENTITIES} element={<EntitiesPage />}>
              <Route index element={<EntitiesList />} />
              <Route path={ENTITY.LANGUAGES} element={<LanguagesPage />}>
                <Route
                  path={ROUTE.TARGET_ENTITY_ENTRY}
                  element={<LanguagesPage />}
                />
              </Route>
              <Route path={ENTITY.SKILLS} element={<SkillsPage />}>
                <Route
                  path={ROUTE.TARGET_ENTITY_ENTRY}
                  element={<SkillsPage />}
                />
              </Route>
              <Route path={ENTITY.DEPARTMENTS} element={<DepartmentsPage />}>
                <Route
                  path={ROUTE.TARGET_ENTITY_ENTRY}
                  element={<DepartmentsPage />}
                />
              </Route>
              <Route path={ENTITY.POSITIONS} element={<PositionsPage />}>
                <Route
                  path={ROUTE.TARGET_ENTITY_ENTRY}
                  element={<PositionsPage />}
                />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path={ROUTE.ANY_OTHER} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
