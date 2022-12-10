import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {}

const UnAuthorized: React.FC<IProps> = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>You are not authorized to view this page</div>
      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </>
  );
};

export default UnAuthorized;
