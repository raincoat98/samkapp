import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import Login from "pages/Login";
import AppRouter from "components/AppRouter";
import SpinnerComponent from "components/SpinnerComponent";
import ErrorAlert from "components/ErrorAlert";
import { autoLogin } from "store/realm";

export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.realm.loggedIn);

  // 에러 객체
  const error = useSelector((state: RootState) => state.realm.error);

  React.useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <div
      style={{
        fontFamily: "맑은 고딕",
        width: "100%",
        height: "100vh",
      }}
    >
      <SpinnerComponent />

      {error ? <ErrorAlert error={error} /> : ""}

      {!isLoggedIn ? <Login /> : <AppRouter />}
    </div>
  );
}
