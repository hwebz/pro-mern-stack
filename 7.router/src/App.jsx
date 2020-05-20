import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, HashRouter, Redirect } from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const NoMatch = () => <p>Page Not Found</p>;

const RouteApp = () => (
  <HashRouter>
    <Switch>
      <Route path="/issues" exact component={IssueList} />
      <Route path="/issues/:id" exact component={IssueEdit} />
      <Route path="*" component={NoMatch} />
      <Redirect from="/" to="/issues" />
    </Switch>
  </HashRouter>
)

ReactDOM.render(<RouteApp />, document.getElementById('contents'));

if (module.hot) {
  module.hot.accept();
}
