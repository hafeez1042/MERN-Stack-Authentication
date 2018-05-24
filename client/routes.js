import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';

export default () => {
  return (
    <Router>
      <App>
        <Switch>
          <Route path="/" exact component={HomePage} key="HomePage" />
          <Route path="/about" exact component={AboutPage} key="HomePage" />
        </Switch>
      </App>
    </Router>
  );
};
