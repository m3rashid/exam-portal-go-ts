import {
  CopyOutlined,
  HomeOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  QuestionCircleOutlined,
  BookOutlined,
  GroupOutlined,
  SettingOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { NavigateFunction } from "react-router-dom";
import type { ItemType } from "antd/es/menu/hooks/useItems";

import { roles, UserType } from "../atoms/auth";
import {
  adminRoutes,
  generalAuthenticatedRoutes,
  generalRoutes,
  superAdminRoutes,
  traineeRoutes,
  trainerRoutes,
} from "./routeConstants";

type SidebarItems = ItemType[];

export const defaultItems: (navigate: NavigateFunction) => {
  [key: string]: ItemType;
} = (navigate) => ({
  home: {
    key: "1",
    icon: <HomeOutlined />,
    label: "Home",
    onClick: () => navigate(generalRoutes.home),
  },
});

export const openToAllItems: (navigate: NavigateFunction) => ItemType[] = (
  navigate
) => [
  {
    key: "6",
    icon: <UserOutlined />,
    label: "Profile",
    onClick: () => navigate(generalAuthenticatedRoutes.profile),
  },
  {
    key: "7",
    icon: <SettingOutlined />,
    label: "Settings",
    onClick: () => navigate(generalAuthenticatedRoutes.settings),
  },
  {
    key: "9",
    icon: <LogoutOutlined />,
    label: "Logout",
    onClick: () => navigate(generalAuthenticatedRoutes.logout),
  },
  {
    key: "8",
    icon: <InfoCircleOutlined />,
    label: "About",
    onClick: () => navigate(generalRoutes.about),
  },
];

export const trainerItems: (navigate: NavigateFunction) => SidebarItems = (
  navigate
) => [
  defaultItems(navigate).home,
  {
    key: "2",
    icon: <QuestionCircleOutlined />,
    label: "All Questions",
    onClick: () => navigate(trainerRoutes.allQuestions),
  },
  {
    key: "3",
    icon: <BookOutlined />,
    label: "All Tests",
    onClick: () => navigate(trainerRoutes.allTests),
  },
  {
    key: "4",
    icon: <CopyOutlined />,
    label: "New Test",
    onClick: () => navigate(trainerRoutes.newTest),
  },
  {
    key: "5",
    icon: <CopyOutlined />,
    label: "Conduct Test",
    onClick: () => navigate(trainerRoutes.conductTest),
  },
];

export const traineeItems: (navigate: NavigateFunction) => SidebarItems = (
  navigate
) => [
  defaultItems(navigate).home,
  {
    key: "2",
    icon: <UserOutlined />,
    label: "Al Past Tests",
    onClick: () => navigate(traineeRoutes.allPastTests),
  },
  {
    key: "3",
    icon: <UserOutlined />,
    label: "Take Test",
    onClick: () => navigate(traineeRoutes.takeTest),
  },
  {
    key: "4",
    icon: <UserOutlined />,
    label: "Register For Test",
    onClick: () => navigate(traineeRoutes.registerForTest),
  },
];

export const adminItems: (navigate: NavigateFunction) => SidebarItems = (
  navigate
) => [
  defaultItems(navigate).home,
  {
    key: "2",
    icon: <UserOutlined />,
    label: "All Trainers",
    onClick: () => navigate(adminRoutes.allTrainers),
  },
  {
    key: "3",
    icon: <BookOutlined />,
    label: "All Courses",
    onClick: () => navigate(adminRoutes.allCourses),
  },
];

export const superAdminItems: (navigate: NavigateFunction) => SidebarItems = (
  navigate
) => [
  defaultItems(navigate).home,
  {
    key: "2",
    icon: <UserOutlined />,
    label: "All Trainers",
    onClick: () => navigate(adminRoutes.allTrainers),
  },
  {
    key: "3",
    icon: <BookOutlined />,
    label: "All Courses",
    onClick: () => navigate(adminRoutes.allCourses),
  },
  {
    key: "4",
    icon: <GroupOutlined />,
    label: "All Organizations",
    onClick: () => navigate(superAdminRoutes.allOrganizations),
  },
];

const testSidebaritems: (navigate: NavigateFunction) => SidebarItems = (
  navigate
) => [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "nav 1",
    onClick: () => navigate(generalRoutes.home),
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "nav 2",
    onClick: () => navigate(generalRoutes.home),
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "nav 3",
    onClick: () => navigate(generalRoutes.home),
  },
];

export const getItems = (
  navigate: NavigateFunction,
  userType: UserType | null
): SidebarItems => {
  switch (userType) {
    case roles.trainee:
      return traineeItems(navigate);
    case roles.trainer:
      return trainerItems(navigate);
    case roles.admin:
      return adminItems(navigate);
    case roles.superAdmin:
      return superAdminItems(navigate);
    default:
      return process.env.NODE_ENV === "development"
        ? testSidebaritems(navigate)
        : [];
  }
};
