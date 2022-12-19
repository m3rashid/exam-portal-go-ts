import React from "react";
import { useRecoilValue } from "recoil";
import { Typography } from "antd";

import { authState } from "../atoms/auth";

interface IProps {}

const Home: React.FC<IProps> = () => {
  const auth = useRecoilValue(authState);

  return (
    <>
      <div>Home</div>
      <Typography.Paragraph code>
        {JSON.stringify({ ...auth, token: "" }, null)}
      </Typography.Paragraph>
    </>
  );
};

export default Home;
