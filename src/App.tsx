import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Main from "./components/Main";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Main />
          </Route>
          <Route path="login">
            <LoginForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
