import { FC, lazy } from "react";

import {
  adminRoutes,
  generalAuthenticatedRoutes,
  generalUnauthenticatedRoutes,
  superAdminRoutes,
  traineeRoutes,
  trainerRoutes,
} from "../api/frontendRouteConstants";
import { AuthState, roles, UserType } from "../atoms/auth";

const Login = lazy(() => import("../pages/login"));
const Logout = lazy(() => import("../pages/logout"));
const AllOrganizations = lazy(
  () => import("../pages/superAdmin/allOrganizations")
);
const Profile = lazy(() => import("../pages/profile"));
const SinglePastTestDetails = lazy(
  () => import("../pages/trainee/singlePastTestDetails")
);
const Register = lazy(() => import("../pages/register"));
const Settings = lazy(() => import("../pages/settings"));
const NewTest = lazy(() => import("../pages/trainer/newTest"));
const TakeTest = lazy(() => import("../pages/trainee/takeTest"));
const AllTests = lazy(() => import("../pages/trainer/allTests"));
const AllCourses = lazy(() => import("../pages/admin/allCourses"));
const ResetPassword = lazy(() => import("../pages/resetPassword"));
const AllTrainers = lazy(() => import("../pages/admin/allTrainers"));
const ForgotPassword = lazy(() => import("../pages/forgotPassword"));
const ConductTest = lazy(() => import("../pages/trainer/conductTest"));
const AllPastTests = lazy(() => import("../pages/trainee/allPastTests"));
const AllQuestions = lazy(() => import("../pages/trainer/allQuestions"));
const RegisterForTest = lazy(() => import("../pages/trainee/registerForTest"));

interface Route {
  path: string;
  component: FC;
  role: UserType[] | "*";
}

export const checkAccess = (authState: AuthState, route: Route) => {
  if (route.role === "*") return true;
  if (route.role.length === 0 && !authState.isAuthenticated) return true;
  if (!authState.isAuthenticated) return false;

  const userType = authState.userType;
  if (!userType) return false;
  return route.role.some((role) => userType.includes(role));
};

export const routes: Route[] = [
  // all Unauthenticated Routes
  {
    path: generalUnauthenticatedRoutes.login,
    component: Login,
    role: [],
  },
  {
    path: generalUnauthenticatedRoutes.register,
    component: Register,
    role: [],
  },
  {
    path: generalUnauthenticatedRoutes.forgotPassword,
    component: ForgotPassword,
    role: [],
  },
  {
    path: generalUnauthenticatedRoutes.resetPassword,
    component: ResetPassword,
    role: [],
  },

  // All Authenticated Routes
  {
    path: generalAuthenticatedRoutes.profile,
    component: Profile,
    role: "*",
  },
  {
    path: generalAuthenticatedRoutes.settings,
    component: Settings,
    role: "*",
  },
  {
    path: generalAuthenticatedRoutes.logout,
    component: Logout,
    role: "*",
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
