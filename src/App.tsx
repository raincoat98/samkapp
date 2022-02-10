import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { onPageRefresh } from "store/realm";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { menuBackground } from "theme";
import Login from "pages/Login";
import AppRouter from "components/AppRouter";
import SpinnerComponent from "components/SpinnerComponent";
import ErrorAlert from "components/ErrorAlert";

export default function App() {
  const dispatch = useDispatch();

  const bgColor = useColorModeValue(menuBackground.light, menuBackground.dark);

  const isLoggedIn = useSelector((state: RootState) => state.realm.loggedIn);

  // 에러 객체
  const error = useSelector((state: RootState) => state.realm.error);

  // 페이지 새로고침시 1회 실행
  useEffect(() => {
    dispatch(onPageRefresh());
  }, [dispatch]);

  return (
    <Flex
      fontFamily="맑은 고딕, 나눔고딕"
      width="100%"
      height="100vh"
      flexDir="column"
      bgColor={bgColor}
    >
      <SpinnerComponent />

      {error && <ErrorAlert error={error} />}

      {!isLoggedIn ? <Login /> : <AppRouter />}
    </Flex>
  );
}
