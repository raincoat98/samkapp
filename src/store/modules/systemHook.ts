import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from ".";
import { loadAction, unloadAction, loginAction, logoutAction } from "./system";

export default function useSystem() {
  const { isLoaded, isLogin } = useSelector((state: RootState) => state.system);
  const dispatch = useDispatch();

  const load = useCallback(() => {
    dispatch(loadAction());
  }, []);
  const unload = useCallback(() => {
    dispatch(unloadAction());
  }, []);

  const login = useCallback(() => {
    dispatch(loginAction());
  }, []);

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return { isLoaded, isLogin, load, unload, login, logout };
}
