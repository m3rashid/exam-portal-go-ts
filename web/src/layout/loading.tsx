import React from "react";
import { Space } from "antd";
import Lottie from "lottie-react";

import examAnimation from "../animations/exam.json";

interface IProps {}

const FullPageLoading: React.FC<IProps> = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Space direction="vertical" align="center">
        <Lottie animationData={examAnimation} />
      </Space>
    </div>
  );
};

export default FullPageLoading;
