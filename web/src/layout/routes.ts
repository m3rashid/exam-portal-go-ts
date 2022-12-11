import { FC } from "react";
import { AuthState, UserType } from "../atoms/auth";
import Logout from "../pages/logout";
import Profile from "../pages/profile";
import Settings from "../pages/settings";
import { generalAuthenticatedRoutes } from "./routeConstants";

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
