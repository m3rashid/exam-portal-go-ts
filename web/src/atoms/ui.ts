import { atom } from "recoil";
import { localStorageKeys } from "../layout/localStorage";

export interface DefaultUiState {
  sidebarOpen: boolean;
}

export const defaultUiState: DefaultUiState = {
  sidebarOpen: false,
};

const getUiFromLocalStorage = (): DefaultUiState => {
  const ui = window.localStorage.getItem(localStorageKeys.ui);
  return ui ? JSON.parse(ui) : defaultUiState;
};

export const uiState = atom({
  key: "uiState",
  default: getUiFromLocalStorage(),
});
