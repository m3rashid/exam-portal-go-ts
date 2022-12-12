import {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Mentions,
  Radio,
  Rate,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from "antd";
import { FC } from "react";

import { AcceptedFormElementTypes, SingleFormItemType } from "./formTypes";

type ObjectMapperType = (item: SingleFormItemType) => {
  // "NA" for nasty javascript truthy-falsey values fix
  // can't return null or undefined => falsey values
  [key in AcceptedFormElementTypes]: JSX.Element | "NA";
};

const ObjectMapper: ObjectMapperType = (item) => {
  const disabled = item.disabled ?? false;

  return {
    input: (
      <Input
        {...{
          disabled: item.disabled,
          type: item.typeOfinput,
        }}
      />
    ),
    textarea: <Input.TextArea {...{ disabled }} />,
    search: <AutoComplete {...{ disabled }} />,
    "tips-and-helps": "NA",
    radio: <Radio {...{ disabled }} />,
    checkbox: <Checkbox {...{ disabled }} />,
    switch: <Switch {...{ disabled }} />,
    dropdown: <Dropdown {...{ disabled }} />,
    slider: <Slider />,
    transfer: <Transfer />,
    "date-picker": <DatePicker />,
    "time-picker": <TimePicker />,
    "tree-select": <TreeSelect />,
    "upload-simple-click": <Upload />,
    "upload-with-thumbnail": <Upload />,
    "upload-drag-drop": <Upload />,
    mentions: <Mentions />,
    rate: <Rate />,
    cascader: <Cascader />,
    "range-picker": "NA",
    hidden: "NA",
    markdown: "NA",
  };
};

interface IProps {
  formItems: SingleFormItemType[];
}

const FormBuilder: FC<IProps> = ({ formItems }) => {
  return (
    <>
      {formItems.map((item, index) => {
        const required = item.required ?? false;

        return (
          <Form.Item
            {...{
              required,
              key: index,
              name: item.name,
              label: item.label,
              ...(item.rules && { rules: item.rules }),
            }}
          >
            {ObjectMapper(item)[item.formElementType] === "NA"
              ? null
              : ObjectMapper(item)[item.formElementType] ??
                ObjectMapper(item).input}
          </Form.Item>
        );
      })}
    </>
  );
};

export default FormBuilder;
