const acceptedFormElementTypes = [
  "input",
  "textarea",
  "tips-and-helps",
  "search",
  //
  "radio",
  "checkbox",
  "switch",
  "dropdown",
  "slider",
  "transfer",
  "date-picker",
  "time-picker",
  "tree-select",
  //
  "upload-simple-click",
  "upload-with-thumbnail",
  "upload-drag-drop",
  //
  "mentions",
  "rate",
  "cascader",
  "range-picker",
  "hidden",
  "markdown",
] as const;
export type AcceptedFormElementTypes = typeof acceptedFormElementTypes[number];

const acceptedFormElementTypesOfInput = [
  "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "time",
  "url",
  "week",
] as const;
export type AcceptedFormElementTypesOfInput =
  typeof acceptedFormElementTypesOfInput[number];

export type SingleFormItemType = {
  name: string;
  label: string;
  required?: boolean;
  formElementType: AcceptedFormElementTypes;
  typeOfinput?: AcceptedFormElementTypesOfInput;
  disabled?: boolean;
  placeholder: string;
  options?: Array<{ label: string; value: string }>;
  initialValue?: string;
  rules?: Array<{ required: boolean; message: string }>;
  autocomplete?: string;
  size?: "small" | "middle" | "large";
};
