import { Form, Select } from "antd";
import { Rule } from "antd/es/form";

const minPhoneNumberLength = 10;
const maxPhoneNumberLength = 10;

const phoneNumerPrefixes = ["+91", "+1"];
export const defaultPhoneNumberPrefix = phoneNumerPrefixes[0];

export const phoneNumberValidator: Rule = {
  validator(_, value) {
    if (!value) return Promise.resolve();
    if (
      value.length > maxPhoneNumberLength ||
      value.length < minPhoneNumberLength
    ) {
      if (maxPhoneNumberLength === minPhoneNumberLength) {
        return Promise.reject(
          new Error(`Contact number must be of ${minPhoneNumberLength} digits`)
        );
      }
      return Promise.reject(
        new Error(
          `Contact number must be between ${minPhoneNumberLength} and ${maxPhoneNumberLength} digits`
        )
      );
    }
  },
};

export const PhoneNumberPrefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      {phoneNumerPrefixes.map((p) => (
        <Select.Option key={p} value={p}>
          {p}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
);
