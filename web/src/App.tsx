import "antd/dist/reset.css";
import { useRecoilState } from "recoil";
import { Suspense, useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/about";
import instance from "./api/instance";
import RootWrapper from "./layout/root";
import { authState } from "./atoms/auth";
import { checkAccess, routes } from "./layout/routes";
import FullPageLoading from "./layout/fullPageLoading";
import UnAuthorized from "./pages/unAuthorized";
import { generalRoutes } from "./layout/routeConstants";

const App = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const waitForSeconds = async (time: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time * 1000);
    });
  };

  const revalidate = useCallback(async () => {
    // revalidate the auth state
    await waitForSeconds(2);
    setAuth({
      ...auth,
      isAuthenticated: true,
      loading: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    revalidate();
  }, [revalidate]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.token}`;
    }
  }, [auth]);

  if (auth.loading) {
    return <FullPageLoading />;
  }

  return (
    <RootWrapper>
      <Suspense fallback={<FullPageLoading />}>
        <Routes>
          {routes.map((route, index) => {
            const allowed = checkAccess(auth, route);
            if (!allowed) {
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
        </Routes>
      </Suspense>
    </RootWrapper>
  );
};

export default App;
