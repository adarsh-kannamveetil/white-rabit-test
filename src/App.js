import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { withRouter } from "react-router-dom";

import Login from "./components/login";
import UserList from "./components/users/list";
import CreateUser from "./components/users/create";
import "./App.css";

function App() {
  return (
    <div>
      {localStorage.getItem("auth") ? (
        <Switch>
          <Route exact path="/user/list" component={UserList} />
          <Route exact path="/user/create" component={CreateUser} />
          <Redirect to="/user/list" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Login} />
          <Redirect to="/" />
        </Switch>
      )}
      <NotificationContainer />
    </div>
  );
}

export default withRouter(App);
