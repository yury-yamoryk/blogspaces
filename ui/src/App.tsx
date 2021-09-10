import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Blogs from "./components/Blogs";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { logoutUser } from "./actions/user";
import { clearMessage } from "./actions/message";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const App: React.FC = () => {
  const currentUser = useSelector<any, any>(state => state.authentication.user);
  const dispatch = useDispatch<(action:any)=>any>();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logoutUser());
  };

  return (
      <Router history={history}>
        <div>
        <nav className="navbar navbar-expand">
            <Link to={"/"} className="navbar-brand ms-1">
              Blog Spaces
            </Link>

            {currentUser ? (
              <div className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={"/"} component={Blogs} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/register" component={SignUp} />
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
