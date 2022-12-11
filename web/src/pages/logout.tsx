import React from "react";
import { Button, Typography } from "antd";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { authState, defaultAuthState } from "../atoms/auth";
import { generalRoutes } from "../layout/routeConstants";

interface IProps {}

const Logout: React.FC<IProps> = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth((prev) => ({ ...prev, loading: true }));
    // TODO: call api to logout

    setAuth({ ...defaultAuthState, loading: false });
    navigate(generalRoutes.home);
  };

  return (
    <div>
      <Typography.Title level={3}>
        Are you sure you want to logout ?
      </Typography.Title>
      <Button onClick={handleLogout} loading={auth.loading}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
