import { UserRoles } from "../../atoms/auth";
import { makeFirstCapital } from "../../utils/stringHelpers";
import { SingleFormItemType } from "../formBuilder/formTypes";

export const registerForm: SingleFormItemType[] = [
  {
    name: "email",
    label: "Email",
    required: true,
    formElementType: "input",
    typeOfinput: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    required: true,
    formElementType: "input",
    typeOfinput: "password",
    placeholder: "Enter your password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    required: true,
    formElementType: "input",
    typeOfinput: "password",
    placeholder: "Confirm your password",
  },
  {
    name: "name",
    label: "Name",
    required: true,
    formElementType: "input",
    typeOfinput: "text",
    placeholder: "Enter your name",
  },
  {
    name: "contact",
    label: "Contact",
    formElementType: "input",
    typeOfinput: "text",
    placeholder: "Enter your contact",
  },
  {
    name: "avatar",
    label: "Avatar",
    formElementType: "upload-with-thumbnail",
    placeholder: "Upload your avatar",
  },
  {
    name: "location",
    label: "Location",
    formElementType: "input",
    typeOfinput: "text",
    placeholder: "Enter your location",
  },
  {
    name: "role",
    label: "Role",
    formElementType: "dropdown",
    placeholder: "Select your role",
    options: UserRoles.map((r) => ({ label: makeFirstCapital(r), value: r })),
  },
];
