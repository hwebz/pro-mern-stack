import React from 'react';
import { Link } from 'react-router-dom';

export default class IssueFilter extends React.Component {
  render() {
    return (
      <div>
        <Link to="/issues">All Issues</Link>
        <hr />
        <Link to={{ pathname: '/issues', search: '?status=Open'}}>Open Issues</Link>
        <hr />
        <Link to="/issues?status=Assigned">Assigned Issues</Link>
      </div>
    );
  }
}
