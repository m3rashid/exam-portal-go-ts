import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { parentDivStyle } from "../utils/centerEverythinginPage";

interface IProps {
  text?: string;
  buttonlabel?: string;
}

const UnAuthorized: React.FC<IProps> = ({ text, buttonlabel }) => {
  const navigate = useNavigate();

  return (
    <div style={parentDivStyle}>
      <Typography.Title level={4} style={{ textAlign: "center" }}>
        {text ?? "You are not authorized to view this page"}
      </Typography.Title>
      <Button onClick={() => navigate("/")}>
        {buttonlabel ?? "Back to Home"}
      </Button>
    </div>
  );
};

export default UnAuthorized;
