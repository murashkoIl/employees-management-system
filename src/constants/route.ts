export enum ROUTE_PARAM {
  EMPLOYEE_ID = ":employeeId",
  PROJECT_ID = ":projectId",
  CV_ID = ":cvId",
  ENTITY_ID = ":entityId",
}

export enum ROUTE_SEGMENT {
  EMPLOYEES = "employees",
  PROJECTS = "projects",
  ENTITIES = "entities",
  CVS = "cvs",
}

export enum ROUTE {
  EMPTY = "/",
  SIGN_IN = "/signin",
  SIGN_UP = "/signup",
  PDF_PATTERNS = "/pdf-patterns",
  RESET_PASSWORD = "/reset-password",
  EMPLOYEES = "/employees",
  TARGET_EMPLOYEE = "/employees/:employeeId",
  PROJECTS = "/projects",
  TARGET_PROJECT = "/projects/:projectId",
  CVS = "/cvs",
  TARGET_CV = "/cvs/:cvId",
  ENTITIES = "/entities",
  TARGET_ENTITY_ENTRY = ":entryId",
  ANY_OTHER = "*",
  TARGET_EMPLOYEE_INFO = "info",
  TARGET_EMPLOYEE_CV = "cv",
}

export enum ENTITY {
  LANGUAGES = "languages",
  SKILLS = "skills",
  DEPARTMENTS = "departments",
  POSITIONS = "positions",
}
