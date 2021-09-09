import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import routerConfig from "utils/routerConfig";
import { useMediaQuery, Box, Flex } from "@chakra-ui/react";
import Sidebar from "components/Sidebar";
import NoMatch from "pages/NoMatch";

export default function AppRouter() {
  const dispatch = useDispatch();

  // 사이드바 열림 여부
  const isSidebarOpen = useSelector(
    (state: RootState) => state.system.isSidebarOpen
  );

  const [isLandscape] = useMediaQuery("(orientation: landscape)");

  return (
    <Router>
      <Flex h={"100%"} w={"100%"}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => {
            dispatch({
              type: "system/toggleSidebar",
            });
          }}
          isLandscape={isLandscape}
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
            {routerConfig.routes.map((route, index) => (
              <Route path={route.path} key={index}>
                {<route.component />}
              </Route>
            ))}

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
