import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Blogs from "./components/Blogs";

const App: React.FC = () => {
  return (
    <div className="container mt-3">
      <Switch>
        <Route exact path={"/"} component={Blogs} />
      </Switch>
    </div>
  );
}

export default App;
