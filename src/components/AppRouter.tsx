import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import routerConfig from "utils/routerConfig";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "components/Sidebar";
import NoMatch from "pages/NoMatch";

export default function AppRouter() {
  return (
    <Router>
      <Flex height="100%" width="100%">
        <Sidebar />

        <Box flex={1} overflow="auto">
          <Switch>
            {/* 리다이렉트 */}
            <Route path="/" exact={true}>
              <Redirect
                to={{
                  pathname: routerConfig.defaultPath,
                }}
              />
            </Route>

            {/* 주소 매핑 */}
            {Object.keys(routerConfig.routes).map((key, index) => {
              const route = routerConfig.routes[key];
              return (
                <Route path={route.path} key={index}>
                  <route.component />
                </Route>
              );
            })}

            {/* 404 매핑 */}
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Box>
      </Flex>
    </Router>
  );
}
