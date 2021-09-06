import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useMediaQuery, Box, Flex } from "@chakra-ui/react";
import Sidebar from "components/Sidebar";
import NoMatch from "components/NoMatch";

export default function AppRouter() {
  const dispatch = useDispatch();

  const defaultPath = useSelector(
    (state: RootState) => state.router.defaultPath
  );
  const routes = useSelector((state: RootState) => state.router.routes);

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
                  pathname: defaultPath,
                }}
              />
            </Route>

            {/* 주소 매핑 */}
            {routes.map((route, index) => (
              <Route
                path={route.path + (route.params || "")}
                key={index}
                children={<route.component />}
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
  );
}
