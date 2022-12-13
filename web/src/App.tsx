import "antd/dist/reset.css";
import { useRecoilValue } from "recoil";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import instance from "./api/instance";
import RootWrapper from "./layout/root";
import { authState } from "./atoms/auth";
import { checkAccess, routes } from "./layout/routes";
import FullPageLoading from "./layout/fullPageLoading";
import { generalRoutes } from "./api/frontendRouteConstants";
import NotFound from "./pages/notFound";
import useAuth from "./hooks/useAuth";

const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const UnAuthorized = lazy(() => import("./pages/unAuthorized"));

const App = () => {
  const auth = useRecoilValue(authState);
  const { $revalidate } = useAuth();

  useEffect(() => {
    $revalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.token}`;
    }
  }, [auth.isAuthenticated, auth.token]);

  if (auth.loading) return <FullPageLoading />;

  return (
    <RootWrapper>
      <Suspense fallback={<FullPageLoading />}>
        <Routes>
          {routes.map((route, index) => {
            const isNoAuthRequiredRoute = checkAccess(auth, route, false);
            const isAuthRequiredRoute = checkAccess(auth, route, true);
            if (isNoAuthRequiredRoute) {
              return (
                <Route
                  path={route.path}
                  element={<route.component />}
                  key={`route ${index} ${route.path}`}
                />
              );
            }

            if (!isAuthRequiredRoute) {
              return (
                <Route
                  path="*"
                  element={<UnAuthorized />}
                  key={`route ${index} ${route.path}`}
                />
              );
            }

            return (
              <Route
                path={route.path}
                element={<route.component />}
                key={`route ${index} ${route.path}`}
              />
            );
          })}
          <Route path={generalRoutes.home} element={<Home />} />
          <Route path={generalRoutes.about} element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </RootWrapper>
  );
};

export default App;
