import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import Login from "pages/Login";
import AppRouter from "components/AppRouter";
import SpinnerComponent from "components/base/SpinnerComponent";
import { autoLogin } from "store/realm";

export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.realm.loggedIn);

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

      {!isLoggedIn ? <Login /> : <AppRouter />}
    </div>
  );
}
