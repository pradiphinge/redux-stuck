import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./redux/store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./redux/actionCreators/auth";
import "./App.css";
import Landing from "./Pages/Landing";
import Header from "./components/Header";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserList from "./Pages/UserList";
import ReferredUsers from "./Pages/ReferredUsers";
import { Provider } from "react-redux";
import { LOGOUT } from "./redux/actionCreators/actionTypes";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <ToastContainer />

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/userList" component={UserList} />
          <PrivateRoute
            exact
            path="/userList/addUser"
            component={ReferredUsers}
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
