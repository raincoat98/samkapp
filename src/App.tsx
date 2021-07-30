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
import NoMatch from "./components/NoMatch";

function App() {
  const defaultPath = useSelector(
    (state: RootState) => state.router.defaultPath
  );
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
                    pathname: defaultPath,
                  }}
                />
              </Route>

              {/* 주소 매핑 */}
              {routes.map((route) => (
                <Route
                  path={route.path + (route.params || "")}
                  key={route.id}
                  children={
                    route.container ? (
                      <PageContainer title={route.title}>
                        <route.component />
                      </PageContainer>
                    ) : (
                      <route.component />
                    )
                  }
                ></Route>
              ))}

              {/* 404 매핑 */}
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </Box>
        </Flex>
      </Router>
    </Box>
  );
}

export default App;
