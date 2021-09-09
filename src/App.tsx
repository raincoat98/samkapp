import { useSelector } from "react-redux";
import { RootState } from "./store";
import Login from "pages/Login";
import AppRouter from "components/AppRouter";
import SpinnerComponent from "components/base/SpinnerComponent";

export default function App() {
  const isLoggedIn = useSelector((state: RootState) => state.realm.loggedIn);

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
