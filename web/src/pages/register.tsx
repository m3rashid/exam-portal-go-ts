import React from "react";
import { Button, Form, Input, Select } from "antd";

import useAuth from "../hooks/useAuth";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../components/forms/beautifyForms";
import {
  phoneNumberValidator,
  defaultPhoneNumberPrefix,
  PhoneNumberPrefixSelector,
} from "../components/forms/contactNumber";
import { RegisterInput } from "../types/auth";
import { parentDivStyle } from "../utils/centerEverythinginPage";
import { makeFirstCapital } from "../utils/stringHelpers";
import { allowedUserRolesToAssign } from "../atoms/auth";

interface IProps {}

const Register: React.FC<IProps> = () => {
  const form = Form.useForm<RegisterInput>()[0];
  const { $register } = useAuth();

  return (
    <div style={parentDivStyle}>
      <h1>Register</h1>
      <br />
      <Form
        form={form}
        name="register"
        {...formItemLayout}
        scrollToFirstError
        onFinish={$register}
        initialValues={{
          prefix: defaultPhoneNumberPrefix,
        }}
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

        <Form.Item
          label="Confirm Password"
          required
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Name"
          required
          name="name"
          rules={[{ required: true, message: "Please enter your Name!" }]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Contact"
          name="contact"
          rules={[phoneNumberValidator]}
        >
          <Input type="number" addonBefore={PhoneNumberPrefixSelector} />
        </Form.Item>

        {/* TODO: ADD Avatar field */}

        <Form.Item label="Location" name="location">
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          required
          name="role"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select>
            {allowedUserRolesToAssign.map((r) => (
              <Select.Option key={r}>{makeFirstCapital(r)}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item htmlFor="register" {...tailFormItemLayout}>
          <Button htmlType="submit">Register</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
