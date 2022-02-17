import { useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { onPageRefresh, getData } from "store/realm";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { menuBackground } from "theme";

import Login from "pages/Login";
import AppRouter from "components/AppRouter";
import SpinnerComponent from "components/SpinnerComponent";
import ErrorAlert from "components/ErrorAlert";
import StatusBar from "components/StatusBar";

export default function App() {
  const dispatch = useDispatch();
  const bgColor = useColorModeValue(menuBackground.light, menuBackground.dark);
  const isLoggedIn = useSelector((state: RootState) => state.realm.loggedIn);
  const error = useSelector((state: RootState) => state.realm.error);

  // 페이지 새로고침시 1회 실행
  useEffect(() => {
    dispatch(onPageRefresh());
  }, [dispatch]);

  // 유휴 상태에서 풀릴 때 데이터 새로고침
  useIdleTimer({
    timeout: 120000, // 120초 이상 아무 동작이 없을 시 유휴상태로 전환
    onActive: () => {
      if (isLoggedIn) dispatch(getData({}));
    },
    debounce: 500,
  });

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

      <StatusBar />
    </Flex>
  );
}
