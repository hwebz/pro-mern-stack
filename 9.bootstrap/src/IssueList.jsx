import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFilter.jsx';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button, Table, Card, Accordion } from 'react-bootstrap';

const IssueRow = (props) => {
  function onDeleteClick() {
    props.deleteIssue(props.issue._id);
  }

  return (
    <tr>
      <td><Link to={`issues/${props.issue._id}`}>{props.issue._id.substr(-4)}</Link></td>
      <td>{props.issue.status}</td>
      <td>{props.issue.owner}</td>
      <td>{props.issue.created.toDateString()}</td>
      <td>{props.issue.effort}</td>
      <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
      <td>{props.issue.title}</td>
      <td>
        <Button size="sm" variant="danger" onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  )
};

class IssueTable extends React.Component {
  render() {
    const issueRows = this.props.issues.map((issue) => <IssueRow key={issue._id} issue={issue} deleteIssue={this.props.deleteIssue} />);
    return (
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Completion</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { issueRows }
        </tbody>
      </Table>
    );
  }
}

IssueTable.propTypes = {
  issues: PropTypes.array.isRequired,
  deleteIssue: PropTypes.func.isRequired
}

export default class IssueList extends React.Component {
  constructor() {
    super();

    this.state = {
      issues: [],
    };

    this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.search;
    const newQuery = this.props.location.search;
    if (oldQuery === newQuery) {
      return;
    }
    this.loadData();
  }

  deleteIssue(id) {
    fetch(`/api/issues/${id}`, { method: 'DELETE' }).then(response => {
      if (!response.ok) alert('Failed to delete issue');
      // else this.loadData();
      else {
        this.setState({
          issues: this.state.issues.filter(i => i._id != id)
        })
      }
    })
  }

  setFilter(search = '') {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search
    })
  }

  loadData() {
    fetch(`/api/issues${this.props.location.search}`).then((response) => response.json()).then((data) => {
      console.log(`Total count of records: ${data._metadata.total_count}`);
      data.records.forEach((issue) => {
        issue.created = new Date(issue.created);
        if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
      });
      this.setState({
        issues: data.records,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  createIssue(newIssue) {
    fetch('/api/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIssue),
    }).then((response) => {
      if (response.ok) {
        response.json().then((updatedIssue) => {
          updatedIssue.created = new Date(updatedIssue.created);
          if (updatedIssue.completionDate) updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          const newIssues = this.state.issues.concat(updatedIssue);
          this.setState({
            issues: newIssues,
          });
        });
      } else {
        response.json().then((err) => {
          alert(`Failed to add issue: ${err.message}`);
        });
      }
    }).catch((err) => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }

  createTestIssue() {
    this.createIssue({
      status: 'New',
      owner: 'Pieta',
      created: new Date(),
      title: 'Completion date should be optional',
    });
  }

  render() {
    const pairs = this.props.location.search ? this.props.location.search.split('?')[1].split('&') : []
    const query = {}
    pairs.forEach((p, pIndex) => {
      const parts = p.split('=');
      if (pIndex === 0) parts[0].replace('&', '');

      query[parts[0]] = parts[1];
    })
    return (
      <div>
        <Accordion>
          <Card className="mt-4 mb-4">
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Filter
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <IssueFilter setFilter={this.setFilter} initFilter={query} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}

IssueList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}