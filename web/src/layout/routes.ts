import { FC } from "react";
import { AuthState, UserType } from "../atoms/auth";

interface Route {
  path: string;
  component: FC;
  role: UserType[];
}

export const checkAccess = (Auth: AuthState, route: Route) => {
  if (!Auth.isAuthenticated) return false;

  const userType = Auth.user.permissions;
  return route.role.some((role) => userType.includes(role));
};

export const routes: Route[] = [];
