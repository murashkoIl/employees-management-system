import { Navigate } from "react-router";
import { RedirectPageProps } from "./RedirectPage.types";

export function RedirectPage({ to }: RedirectPageProps) {
  return <Navigate to={to} />;
}
