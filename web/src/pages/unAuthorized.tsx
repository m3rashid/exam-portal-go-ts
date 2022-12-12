import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { parentDivStyle } from "../utils/centerEverythinginPage";

interface IProps {}

const UnAuthorized: React.FC<IProps> = () => {
  const navigate = useNavigate();

  return (
    <div style={parentDivStyle}>
      <Typography.Title level={4} style={{ textAlign: "center" }}>
        You are not authorized to view this page
      </Typography.Title>
      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </div>
  );
};

export default UnAuthorized;
