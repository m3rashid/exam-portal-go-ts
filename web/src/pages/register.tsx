import { Form } from "antd";
import React from "react";

import FormBuilder from "../components/formBuilder";
import { registerForm } from "../components/forms/register";

interface IProps {}

const Register: React.FC<IProps> = () => {
  return (
    <div>
      <Form>
        <FormBuilder formItems={registerForm} />
      </Form>
    </div>
  );
};

export default Register;
