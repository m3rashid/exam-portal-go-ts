import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

import { parentDivStyle } from "../utils/centerEverythinginPage";

interface IProps {}

const NotFound: React.FC<IProps> = () => {
  const navigate = useNavigate();

  return (
    <div style={parentDivStyle}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={() => navigate("/")}>Go Back Home</Button>}
      />
    </div>
  );
};

export default NotFound;
