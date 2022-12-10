import "antd/dist/reset.css";
import { useRecoilState } from "recoil";
import { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/about";
import instance from "./api/instance";
import RootWrapper from "./layout/root";
import { authState } from "./atoms/auth";
import { checkAccess, routes } from "./layout/routes";
import FullPageLoading from "./layout/fullPageLoading";
import UnAuthorized from "./pages/unAuthorized";

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
      console.log("User is authenticated");
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
      <Routes>
        {routes.map((route, index) => {
          const allowed = checkAccess(auth, route);
          if (!allowed) {
            return <UnAuthorized />;
          }

          return (
            <Route
              key={`route ${index} ${route.path}`}
              path={route.path}
              element={<route.component />}
            />
          );
        })}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </RootWrapper>
  );
};

export default App;
