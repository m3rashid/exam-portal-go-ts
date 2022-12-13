import React from "react";
import { useRecoilValue } from "recoil";
import { Button, Typography } from "antd";

import useAuth from "../hooks/useAuth";
import { authState } from "../atoms/auth";
import { parentDivStyle } from "../utils/centerEverythinginPage";

interface IProps {}

const Logout: React.FC<IProps> = () => {
  const auth = useRecoilValue(authState);
  const { $logout } = useAuth();

  return (
    <div style={parentDivStyle}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Are you sure you want to logout ?
      </Typography.Title>
      <Button onClick={$logout} loading={auth.loading}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
