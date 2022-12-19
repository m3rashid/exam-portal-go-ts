import { message } from "antd";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import instance from "../api/instance";
import { localStorageKeys } from "../layout/localStorage";
import { LoginInput, RegisterInput } from "../types/auth";
import { authRoutes } from "../api/backendRouteConstants";
import { authState, defaultAuthState } from "../atoms/auth";
import { generalUnauthenticatedRoutes } from "../api/frontendRouteConstants";

const useAuth = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const $afterSuccess = (responseData: any) => {
    message.success(responseData.status);
    window.localStorage.setItem(localStorageKeys.token, responseData.token);
    setAuth({
      token: responseData.token,
      isAuthenticated: true,
      loading: false,
      user: responseData.user,
      error: null,
      userType: responseData.user.Role,
    });
    navigate(-1);
  };

  const $afterFailure = (error: any) => {
    message.error(error.response.data.error);
    window.localStorage.removeItem(localStorageKeys.token);
    setTimeout(() => setAuth({ ...defaultAuthState, loading: false }), 1500);
  };

  const $login = async (input: LoginInput) => {
    setAuth((prev) => ({ ...prev, loading: true }));
    try {
      const { data } = await instance.post(authRoutes.login, { ...input });
      $afterSuccess(data);
    } catch (err) {
      $afterFailure(err);
    }
  };

  const $logout = async () => {
    try {
      const { data } = await instance.post(authRoutes.logout, {});
      window.localStorage.removeItem(localStorageKeys.token);
      instance.defaults.headers.common["Authorization"] = "";
      setAuth({ ...defaultAuthState, loading: false });
      message.success(data.status);
    } catch (err) {
      $afterFailure(err);
    } finally {
      navigate(generalUnauthenticatedRoutes.login);
    }
  };

  const $register = async (data: RegisterInput) => {};

  const $revalidate = useCallback(async () => {
    const token = window.localStorage.getItem(localStorageKeys.token);
    if (!token) return setAuth((prev) => ({ ...prev, loading: false }));

    try {
      const { data } = await instance.post(
        authRoutes.revalidate,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      $afterSuccess(data);
    } catch (err) {
      $afterFailure(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    $login,
    $logout,
    $register,
    $revalidate,
  };
};

export default useAuth;
