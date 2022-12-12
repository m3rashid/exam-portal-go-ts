import React from "react";
import { useRecoilState } from "recoil";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { generalRoutes } from "../layout/routeConstants";
import { authState, defaultAuthState } from "../atoms/auth";
import { parentDivStyle } from "../utils/centerEverythinginPage";

interface IProps {}

const Logout: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);

  const handleLogout = () => {
    setAuth((prev) => ({ ...prev, loading: true }));
    // TODO: call api to logout

    setAuth({ ...defaultAuthState, loading: false });
    navigate(generalRoutes.home);
  };

  return (
    <div style={parentDivStyle}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Are you sure you want to logout ?
      </Typography.Title>
      <Button onClick={handleLogout} loading={auth.loading}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
