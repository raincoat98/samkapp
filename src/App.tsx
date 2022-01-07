import { useSelector } from "react-redux";
import { RootState } from "./store";
import Login from "pages/Login";
import AppRouter from "components/AppRouter";
import SpinnerComponent from "components/SpinnerComponent";
import ErrorAlert from "components/ErrorAlert";
export default function App() {
  const isLoggedIn = useSelector((state: RootState) => state.realm.loggedIn);

  // 에러 객체
  const error = useSelector((state: RootState) => state.realm.error);

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
