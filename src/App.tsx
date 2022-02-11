import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { onPageRefresh, getData } from "store/realm";
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
  const error = useSelector((state: RootState) => state.realm.error);
  const intervalRef = useRef<any>();

  // 페이지 새로고침시 1회 실행
  useEffect(() => {
    dispatch(onPageRefresh());
  }, [dispatch]);

  useEffect(() => {
    function backgroundDataRefresh() {
      dispatch(getData({ isBackground: true }));
    }

    if (isLoggedIn) {
      // 120초 마다 모든 데이터 새로고침
      intervalRef.current = setInterval(backgroundDataRefresh, 120000);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [dispatch, isLoggedIn]);

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
