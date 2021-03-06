import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { toggleSidebar } from "store/system";
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
  const dispatch = useDispatch();

  // 사이드바 열림 여부
  const isSidebarOpen = useSelector(
    (state: RootState) => state.system.isSidebarOpen
  );

  return (
    <Router>
      <Flex h={"100%"} w={"100%"}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => dispatch(toggleSidebar())}
        />

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
