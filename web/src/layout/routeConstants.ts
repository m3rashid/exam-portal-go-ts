export const generalRoutes = {
  home: "/",
  about: "/about",
};

export const generalAuthenticatedRoutes = {
  profile: "/profile",
  settings: "/settings",
  logout: "/logout",
};

export const traineeRoutes = {
  allPastTests: "/trainee/tests/past",
  singlePastTestDetails: "/trainee/tests/past/details",
  takeTest: "/trainee/tests?testId=",
  registerForTest: "/trainee/tests/register?testId=",
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
