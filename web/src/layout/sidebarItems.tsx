import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

import { UserType } from "../atoms/auth";

type SidebarItems = MenuProps["items"];

export const trainerItems: SidebarItems = [];

export const traineeItems: SidebarItems = [];

export const adminItems: SidebarItems = [];

export const defaultItems: SidebarItems = [];

export const superAdminItems: SidebarItems = [];

const testSidebaritems: SidebarItems = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "nav 1",
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "nav 2",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "nav 3",
  },
];

export const getItems = (userType: UserType | null): SidebarItems => {
  switch (userType) {
    case "TRAINER":
      return trainerItems;
    case "TRAINEE":
      return traineeItems;
    case "ADMIN":
      return adminItems;
    case "SUPER_ADMIN":
      return superAdminItems;
    default:
      return process.env.NODE_ENV === "development" ? testSidebaritems : [];
  }
};
