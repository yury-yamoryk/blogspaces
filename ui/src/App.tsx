import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Blogs from "./components/Blogs";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { logoutUser } from "./actions/user";
import { clearMessage } from "./actions/message";
import { createBrowserHistory } from "history";
import Blog from "./components/Blog";
import Post from "./components/Post";
import CreateBlog from "./components/CreateBlog";

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
            <Link to={"/spaces"} className="navbar-brand ms-1">
              Blog Spaces
            </Link>

            {currentUser ? (
              <div className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a href="/spaces/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to={"/spaces/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/spaces/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/">
                <Redirect to="/spaces" />
              </Route>
              <Route exact path={["/spaces/"]} component={Blogs} />
              <Route exact path="/spaces/login" component={SignIn} />
              <Route exact path="/spaces/register" component={SignUp} />
              <Route exact path="/spaces/:userName/:blogId" component={Blog} />
              <Route exact path="/spaces/:userName/:blogId/:postId" component={Post} />
              <Route exact path="/spaces/createBlog" component={CreateBlog} />
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
