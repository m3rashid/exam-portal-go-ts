import { atom } from "recoil";

export type UserType = "TRAINEE" | "TRAINER" | "ADMIN" | "SUPER_ADMIN";

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
  userType: null,
  loading: true,
  error: null,
  token: null,
};

export const authState = atom({
  key: "authState",
  default: defaultAuthState,
});
