import React from 'react';
import { Router, BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import Main from '../components/Main/Main';
import NavBar from "../components/General/NavBar";

export const history = createHistory();

const AppRouter = () => (

  <Router history={history}>
    <div className="main">
      <NavBar />
      <div className="content-area">
          <Switch>
            <Route path="/login" component={LoginPage} exact={true} />
            <Route path="/" component={Main} exact={true} />
            <Route component={NotFoundPage} />
          </Switch>
      </div>
    </div>

  </Router>
);


export default AppRouter;
