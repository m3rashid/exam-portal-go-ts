export const generalRoutes = {
  home: "/",
  about: "/about",
};

export const generalUnauthenticatedRoutes = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
};

export const generalAuthenticatedRoutes = {
  profile: "/profile",
  settings: "/settings",
  logout: "/logout",
};

export const traineeRoutes = {
  allPastTests: "/trainee/tests/past",
  takeTest: "/trainee/tests/:testId",
  singlePastTestDetails: "/trainee/tests/:testId/details",
  registerForTest: "/trainee/tests/:testId/register",
};

export const trainerRoutes = {
  allQuestions: "/trainer/questions/all",
  allTests: "/trainer/tests/all",
  newTest: "/trainer/tests/new",
  conductTest: "/trainer/tests/conduct",
};

export const adminRoutes = {
  allTrainers: "/admin/trainers/all",
  allCourses: "/admin/courses/all",
};

export const superAdminRoutes = {
  allOrganizations: "/super-admin/orgs/all",
};
