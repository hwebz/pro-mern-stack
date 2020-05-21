import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Switch, Route, HashRouter, Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const NoMatch = () => <p>Page Not Found</p>;

const App = props => (
  <div>
    <div className="header">
      <h1>Issue Tracker</h1>
    </div>
    <div className="contents">
      {props.children}
    </div>
    <div className="footer">
      Full source code available at this <a href="https://github.com/vasansr/pro-mern-stack">Github Repository</a>
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired
}

const RouteApp = () => (
  <Router history={createBrowserHistory()}>
    <Switch>
      {/* Have to place exact attr for parent route */}
      <Route path="/">
        <App>
          <Switch>
            <Route path="/issues" exact component={IssueList} />
            <Route path="/issues/:id" component={IssueEdit} />
            <Route path="*" component={NoMatch} />
          </Switch>
          <Redirect from="/" to="/issues" />
        </App>
      </Route>
    </Switch>
  </Router>
)

ReactDOM.render(<RouteApp />, document.getElementById('contents'));

if (module.hot) {
  module.hot.accept();
}
