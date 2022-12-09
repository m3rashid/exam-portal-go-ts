import "antd/dist/reset.css";
import { useRecoilState } from "recoil";
import { useCallback, useEffect } from "react";

import instance from "./api/instance";
import Loading from "./layout/loading";
import RootWrapper from "./layout/root";
import { authState } from "./atoms/auth";

const App = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const waitFor2Seconds = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  };

  const revalidate = useCallback(async () => {
    // revalidate the auth state
    await waitFor2Seconds();
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
    return <Loading />;
  }

  return (
    <RootWrapper>
      <div>App</div>
    </RootWrapper>
  );
};

export default App;
