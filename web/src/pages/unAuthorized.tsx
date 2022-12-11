import { Button, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {}

const UnAuthorized: React.FC<IProps> = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "calc(100vh - 150px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography.Title level={4}>
        You are not authorized to view this page
      </Typography.Title>
      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </div>
  );
};

export default UnAuthorized;
