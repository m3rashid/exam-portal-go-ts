import { FC, lazy } from "react";
import { AuthState, UserType } from "../atoms/auth";
import { generalAuthenticatedRoutes } from "./routeConstants";

const Logout = lazy(() => import("../pages/logout"));
const Profile = lazy(() => import("../pages/profile"));
const Settings = lazy(() => import("../pages/settings"));

interface Route {
  path: string;
  component: FC;
  role: UserType[];
}

export const checkAccess = (Auth: AuthState, route: Route) => {
  if (!Auth.isAuthenticated) return false;

  const userType = Auth.userType;
  if (!userType) return false;
  return route.role.some((role) => userType.includes(role));
};

export const routes: Route[] = [
  {
    path: generalAuthenticatedRoutes.profile,
    component: Profile,
    role: ["TRAINEE", "TRAINER", "ADMIN", "SUPER_ADMIN"],
  },
  {
    path: generalAuthenticatedRoutes.settings,
    component: Settings,
    role: ["TRAINEE", "TRAINER", "ADMIN", "SUPER_ADMIN"],
  },
  {
    path: generalAuthenticatedRoutes.logout,
    component: Logout,
    role: ["TRAINEE", "TRAINER", "ADMIN", "SUPER_ADMIN"],
  },
];
