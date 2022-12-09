import {} from "@ant-design/icons";
import { MenuProps } from "antd";

import { UserType } from "../atoms/auth";

type SidebarItems = MenuProps["items"];

export const trainerItems: SidebarItems = [];

export const traineeItems: SidebarItems = [];

export const adminItems: SidebarItems = [];

export const defaultItems: SidebarItems = [];

export const superAdminItems: SidebarItems = [];

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
      return defaultItems;
  }
};
