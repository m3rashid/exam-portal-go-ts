import React from "react";
import { Button, Form, Input } from "antd";

import useAuth from "../hooks/useAuth";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../components/forms/beautifyForms";
import { LoginInput } from "../types/auth";
import { parentDivStyle } from "../utils/centerEverythinginPage";

interface IProps {}

const Login: React.FC<IProps> = () => {
  const form = Form.useForm<LoginInput>()[0];
  const { $login } = useAuth();

  return (
    <div style={parentDivStyle}>
      <h1>Login</h1>
      <br />
      <Form
        form={form}
        name="login"
        {...formItemLayout}
        scrollToFirstError
        onFinish={$login}
      >
        <Form.Item
          label="Email"
          required
          name="email"
          rules={[
            { type: "email", message: "The email is not valid!" },
            { required: true, message: "Please enter your E-mail!" },
          ]}
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item
          label="Password"
          required
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item htmlFor="login" {...tailFormItemLayout}>
          <Button htmlType="submit">Login</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
