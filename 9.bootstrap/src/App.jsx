import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Switch, Route, HashRouter, Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronDown, faDotCircle, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const NoMatch = () => <p>Page Not Found</p>;

const Header = () => (
  <Navbar bg="light">
    <div className="container">
      <Navbar.Brand>Issue Tracker</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <LinkContainer className="nav-link" to="/issues">
            <NavItem>Issues</NavItem>
          </LinkContainer>
          <LinkContainer className="nav-link" to="/reports">
            <NavItem>Reports</NavItem>
          </LinkContainer>
        </Nav>
        <Nav>
          <Nav.Link href="#">
            <NavItem>
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Create Issue
            </NavItem>
          </Nav.Link>
          <NavDropdown alignRight id="user-dropdown" title={<FontAwesomeIcon icon={faEllipsisH} />}>
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </div>
  </Navbar>
);

const App = props => (
  <div>
    <Header />
    <div className="container">
      {props.children}
    </div>
    <div className="footer">
      <div className="container">
        Full source code available at this <a href="https://github.com/vasansr/pro-mern-stack">Github Repository</a>
      </div>
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
          <div>
            <Switch>
              <Redirect exact from="/" to="/issues" />
              <Route path="/issues" exact component={IssueList} />
              <Route path="/issues/:id" component={IssueEdit} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </div>
        </App>
      </Route>
    </Switch>
  </Router>
)

ReactDOM.render(<RouteApp />, document.getElementById('contents'));

if (module.hot) {
  module.hot.accept();
}
