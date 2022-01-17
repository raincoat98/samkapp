import { useSelector } from "react-redux";
import { RootState } from "./store";
import { chakra, useColorModeValue } from "@chakra-ui/react";
import { menuBackground } from "utils/colors";
import Login from "pages/Login";
import AppRouter from "components/AppRouter";
import SpinnerComponent from "components/SpinnerComponent";
import ErrorAlert from "components/ErrorAlert";

export default function App() {
  const bgColor = useColorModeValue(menuBackground.light, menuBackground.dark);

  const isLoggedIn = useSelector((state: RootState) => state.realm.loggedIn);

  // 에러 객체
  const error = useSelector((state: RootState) => state.realm.error);

  return (
    <chakra.div
      fontFamily="맑은 고딕, 나눔고딕"
      width="100%"
      height="100vh"
      bgColor={bgColor}
    >
      <SpinnerComponent />

      {error && <ErrorAlert error={error} />}

      {!isLoggedIn ? <Login /> : <AppRouter />}
    </chakra.div>
  );
}
