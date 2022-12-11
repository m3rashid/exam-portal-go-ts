export const traineeRoutes = {};

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

export const generalRoutes = {
  home: "/",
  about: "/about",
};

export const generalAuthenticatedRoutes = {
  profile: "/profile",
  settings: "/settings",
  logout: "/logout",
};
