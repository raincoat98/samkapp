import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./store/modules";
import { Box, Flex } from "@chakra-ui/react";

// 컴포넌트
import Sidebar from "./components/Sidebar";
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";
import Setting from "./components/Setting";
import LoginForm from "./components/LoginForm";

function App() {
  const isLoaded = useSelector((state: RootState) => state.system.isLoaded);

  if (!isLoaded) {
    return <SplashScreen />;
  }
  return (
    <div className="App">
      <LoginForm />
      <Router>
        <Flex h={"100%"} w={"100%"}>
          <Sidebar />
          <Box flex={1} overflow="auto">
            <Switch>
              <Route path="/" exact={true}>
                <Redirect
                  to={{
                    pathname: "/home",
                  }}
                />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/setting">
                <Setting />
              </Route>
            </Switch>
          </Box>
        </Flex>
      </Router>
    </div>
  );
}

export default App;
