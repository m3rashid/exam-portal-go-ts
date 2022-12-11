import { atom } from "recoil";

export const UserRoles = [
  "TRAINEE",
  "TRAINER",
  "ADMIN",
  "SUPER_ADMIN",
] as const;

export const roles = {
  trainee: UserRoles[0],
  trainer: UserRoles[1],
  admin: UserRoles[2],
  superAdmin: UserRoles[3],
};

export type UserType = typeof UserRoles[number];

export interface AuthState {
  isAuthenticated: boolean;
  user: any;
  userType: UserType | null;
  loading: boolean;
  error: any;
  token: string | null;
}

export const defaultAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  userType: "TRAINEE",
  loading: true,
  error: null,
  token: null,
};

export const authState = atom({
  key: "authState",
  default: defaultAuthState,
});
