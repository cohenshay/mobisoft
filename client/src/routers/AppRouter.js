import React from 'react';
import { Router, BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import Main from '../components/Main/Main';
import NavBar from "../components/General/NavBar";
import SignIn from "../components/SignIn";
import Verify from "../components/Verify";
import Orders from "../components/Orders";

export const history = createHistory();

const AppRouter = () => (

  <Router history={history}>
    <div className="main">
      <NavBar />
      <div className="content-area">
        <Switch>
          <Route path="/" component={Main} exact={true} />
          <Route path="/login" component={LoginPage} />
          <Route path="/sign" component={SignIn} />
          <Route path="/verify" component={Verify} />
          <Route path="/orders" component={Orders} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>

  </Router>
);


export default AppRouter;
