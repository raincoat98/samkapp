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

function App() {
  const defaultRoute = useSelector((state: RootState) => state.router.default);
  const routes = useSelector((state: RootState) => state.router.routes);

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
                    pathname: defaultRoute,
                  }}
                />
              </Route>

              {/* 주소 매핑 */}
              {routes.map((route) => (
                <Route path={route.path} key={route.id}>
                  <PageContainer title={route.title}>
                    <route.component />
                  </PageContainer>
                </Route>
              ))}
            </Switch>
          </Box>
        </Flex>
      </Router>
    </Box>
  );
}

export default App;
