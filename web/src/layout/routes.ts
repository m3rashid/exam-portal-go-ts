import { FC, lazy } from "react";

import {
  adminRoutes,
  generalAuthenticatedRoutes,
  superAdminRoutes,
  traineeRoutes,
  trainerRoutes,
} from "./routeConstants";
import { AuthState, roles, UserType } from "../atoms/auth";
import AllPastTests from "../pages/trainee/allPastTests";
import SinglePastTestDetails from "../pages/trainee/singlePastTestDetails";
import TakeTest from "../pages/trainee/takeTest";
import RegisterForTest from "../pages/trainee/registerForTest";

const Logout = lazy(() => import("../pages/logout"));
const AllOrganizations = lazy(
  () => import("../pages/superAdmin/allOrganizations")
);
const Profile = lazy(() => import("../pages/profile"));
const Settings = lazy(() => import("../pages/settings"));
const NewTest = lazy(() => import("../pages/trainer/newTest"));
const AllTests = lazy(() => import("../pages/trainer/allTests"));
const AllCourses = lazy(() => import("../pages/admin/allCourses"));
const AllTrainers = lazy(() => import("../pages/admin/allTrainers"));
const ConductTest = lazy(() => import("../pages/trainer/conductTest"));
const AllQuestions = lazy(() => import("../pages/trainer/allQuestions"));

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
  // All Authenticated Routes
  {
    path: generalAuthenticatedRoutes.profile,
    component: Profile,
    role: Object.values(roles),
  },
  {
    path: generalAuthenticatedRoutes.settings,
    component: Settings,
    role: Object.values(roles),
  },
  {
    path: generalAuthenticatedRoutes.logout,
    component: Logout,
    role: Object.values(roles),
  },

  // Trainee Routes
  {
    path: traineeRoutes.allPastTests,
    component: AllPastTests,
    role: [roles.trainee],
  },
  {
    path: traineeRoutes.singlePastTestDetails,
    component: SinglePastTestDetails,
    role: [roles.trainee],
  },
  {
    path: traineeRoutes.takeTest,
    component: TakeTest,
    role: [roles.trainee],
  },
  {
    path: traineeRoutes.registerForTest,
    component: RegisterForTest,
    role: [roles.trainee],
  },

  // Trainer Routes
  {
    path: trainerRoutes.allQuestions,
    component: AllQuestions,
    role: [roles.trainer],
  },
  {
    path: trainerRoutes.allTests,
    component: AllTests,
    role: [roles.trainer],
  },
  {
    path: trainerRoutes.newTest,
    component: NewTest,
    role: [roles.trainer],
  },
  {
    path: trainerRoutes.conductTest,
    component: ConductTest,
    role: [roles.trainer],
  },

  // Admin Routes
  {
    path: adminRoutes.allTrainers,
    component: AllTrainers,
    role: [roles.admin, roles.superAdmin],
  },
  {
    path: adminRoutes.allCourses,
    component: AllCourses,
    role: [roles.admin, roles.superAdmin],
  },

  // Super Admin Routes
  {
    path: superAdminRoutes.allOrganizations,
    component: AllOrganizations,
    role: [roles.superAdmin],
  },
];
