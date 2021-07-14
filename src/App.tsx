import { useSelector } from "react-redux";
import { RootState } from "./store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

// 컴포넌트
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import WorkCondition from "./components/WorkCondition";
import WorkOrderList from "./components/WorkOrderList";
import Setting from "./components/Setting";
import LoginForm from "./components/LoginForm";

function App() {
  const router = useSelector((state: RootState) => state.router);

  return (
    <Box fontFamily="맑은 고딕" w="100%" h="100vh">
      <LoginForm />
      <Router>
        <Flex h={"100%"} w={"100%"}>
          <Sidebar />
          <Box flex={1} overflow="auto">
            <Switch>
              {/* Home으로 리다이렉트 */}
              <Route path="/" exact={true}>
                <Redirect
                  to={{
                    pathname: router.home,
                  }}
                />
              </Route>
              {/* 홈 */}
              <Route path={router.home}>
                <Home />
              </Route>
              {/* 작업 현황 */}
              <Route path={router.WorkCondition}>
                <WorkCondition />
              </Route>
              {/* 작업 지시서 리스트 */}
              <Route path={router.WorkOrderList}>
                <WorkOrderList />
              </Route>
              {/* 설정 */}
              <Route path={router.setting}>
                <Setting />
              </Route>
            </Switch>
          </Box>
        </Flex>
      </Router>
    </Box>
  );
}

export default App;
