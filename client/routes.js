import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

export default () => {
  return (
    <Router>
      <App>
        <Switch>
          <Route path="/" exact component={HomePage} key="HomePage" />
          <Route path="/login" component={LoginPage} key="LoginPage" />
          <Route path="/register" component={RegisterPage} key="RegisterPage" />
          <Route path="/dashboard" component={DashboardPage} key="DashboardPage" />
        </Switch>
      </App>
    </Router>
  );
};
