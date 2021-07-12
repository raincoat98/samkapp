import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { Box, Flex } from "@chakra-ui/react";

// 컴포넌트
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import WorkCondition from "./components/WorkCondition";
import WorkOrderList from "./components/WorkOrderList";
import Setting from "./components/Setting";
import LoginForm from "./components/LoginForm";

function App() {
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
              <Route path="/work_condition">
                <WorkCondition />
              </Route>
              <Route path="/work_order_list">
                <WorkOrderList />
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
