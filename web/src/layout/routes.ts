import { FC, lazy } from "react";

import {
  adminRoutes,
  generalAuthenticatedRoutes,
  superAdminRoutes,
  traineeRoutes,
  trainerRoutes,
} from "./routeConstants";
import { AuthState, UserType } from "../atoms/auth";
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

  // Trainee Routes
  {
    path: traineeRoutes.allPastTests,
    component: AllPastTests,
    role: ["TRAINEE"],
  },
  {
    path: traineeRoutes.singlePastTestDetails,
    component: SinglePastTestDetails,
    role: ["TRAINEE"],
  },
  {
    path: traineeRoutes.takeTest,
    component: TakeTest,
    role: ["TRAINEE"],
  },
  {
    path: traineeRoutes.registerForTest,
    component: RegisterForTest,
    role: ["TRAINEE"],
  },

  // Trainer Routes
  {
    path: trainerRoutes.allQuestions,
    component: AllQuestions,
    role: ["TRAINER"],
  },
  {
    path: trainerRoutes.allTests,
    component: AllTests,
    role: ["TRAINER"],
  },
  {
    path: trainerRoutes.newTest,
    component: NewTest,
    role: ["TRAINER"],
  },
  {
    path: trainerRoutes.conductTest,
    component: ConductTest,
    role: ["TRAINER"],
  },

  // Admin Routes
  {
    path: adminRoutes.allTrainers,
    component: AllTrainers,
    role: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    path: adminRoutes.allCourses,
    component: AllCourses,
    role: ["ADMIN", "SUPER_ADMIN"],
  },

  // Super Admin Routes
  {
    path: superAdminRoutes.allOrganizations,
    component: AllOrganizations,
    role: ["SUPER_ADMIN"],
  },
];
