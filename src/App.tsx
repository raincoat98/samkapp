import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import * as RealmWeb from "realm-web";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useMediaQuery, Box, Flex } from "@chakra-ui/react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import NoMatch from "./components/NoMatch";
import SpinnerComponent from "components/frames/SpinnerComponent";

function App() {
  const dispatch = useDispatch();

  dispatch({
    type: "system/closeProgress",
  });

  const defaultPath = useSelector(
    (state: RootState) => state.router.defaultPath
  );
  const routes = useSelector((state: RootState) => state.router.routes);

  const realmAppId = useSelector((state: RootState) => state.realm.appId);
  const realmAppUser = useSelector((state: RootState) => state.realm.user);

  React.useEffect(() => {
    init();

    async function init() {
      const realmApp = new RealmWeb.App({ id: realmAppId });
      dispatch({
        type: "realm/init",
        payload: realmApp,
      });
    }
  }, [dispatch, realmAppId]);

  const [isLandscape] = useMediaQuery("(orientation: landscape)");

  return (
    <div
      style={{
        fontFamily: "맑은 고딕",
        width: "100%",
        height: "100vh",
      }}
    >
      <SpinnerComponent />

      {!realmAppUser ? (
        <Login />
      ) : (
        <Router>
          <Flex h={"100%"} w={"100%"}>
            {isLandscape ? <Sidebar /> : ""}

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
      )}
    </div>
  );
}

export default App;
