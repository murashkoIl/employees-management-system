import { GuardFunction } from "@helpers/guard";
import { authStore } from "@src/stores/AuthStore/AuthStore";
import { observer } from "mobx-react-lite";
import { Outlet, RouteProps } from "react-router";

export type ProtectedRouteProps = RouteProps & {
  fallback: () => JSX.Element | null;
  guards: GuardFunction[];
};

const ProtectedRoute = ({ guards, fallback }: ProtectedRouteProps) => {
  const { user$ } = authStore;

  return <>{guards.every((guard) => guard(user$)) ? <Outlet /> : fallback()}</>;
};

export default observer(ProtectedRoute);
