import { useSelector } from "react-redux";
import { RootState } from "./store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import Sidebar from "./components/Sidebar";
import PageContainer from "./components/frames/PageContainer";
import LineCondition from "./components/LineCondition";
import ClientManage from "./components/ClientManage";

function App() {
  const router = useSelector((state: RootState) => state.router);

  return (
    <Box fontFamily="맑은 고딕" w="100%" h="100vh">
      <Router>
        <Flex h={"100%"} w={"100%"}>
          <Sidebar />
          <Box flex={1} overflow="auto">
            <Switch>
              {/* 리다이렉트 */}
              <Route path="/" exact={true}>
                <Redirect
                  to={{
                    pathname: router.default.path,
                  }}
                />
              </Route>

              {/* 거래처 관리 */}
              <Route path={router.clientManage.path}>
                <PageContainer title={router.clientManage.title}>
                  <ClientManage />
                </PageContainer>
              </Route>

              {/* 설비 가동 상황 */}
              <Route path={router.operateCondition.path}>
                <PageContainer title={router.operateCondition.title}>
                  <LineCondition />
                </PageContainer>
              </Route>
              {/* 라인 현황 */}
              <Route path={router.lineCondition.path}>
                <PageContainer title={router.lineCondition.title}>
                  <LineCondition />
                </PageContainer>
              </Route>
              {/* 작업 현황 */}
              <Route path={router.workCondition.path}>
                <PageContainer title={router.workCondition.title}>
                  <LineCondition />
                </PageContainer>
              </Route>
              {/* 작업 지시서 리스트 */}
              <Route path={router.workOrderList.path}>
                <LineCondition />
              </Route>
              {/* 설정 */}
              <Route path={router.setting.path}>
                <PageContainer title={router.setting.title}>
                  <LineCondition />
                </PageContainer>
              </Route>
            </Switch>
          </Box>
        </Flex>
      </Router>
    </Box>
  );
}

export default App;
