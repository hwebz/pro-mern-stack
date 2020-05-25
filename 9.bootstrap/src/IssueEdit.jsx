import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class IssueEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issue: {
                _id: '',
                title: '',
                status: '',
                owner: '',
                effort: null,
                completionDate: null,
                created: ''
            },
            invalidFields: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onValidityChange = this.onValidityChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadData();
        }
    }

    onSubmit(e) {
        e.preventDefault();

        if (Object.keys(this.state.invalidFields).length !== 0) {
            return;
        }

        fetch(`/api/issues/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.issue)
        }).then(response => {
            if (response.ok) {
                response.json().then(updatedIssue => {
                    updatedIssue.created = new Date(updatedIssue.created);
                    if (updatedIssue.completionDate) {
                        updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                    }
                    this.setState({
                        issue: updatedIssue
                    });
                    alert('Updated issue successfully.');
                })
            } else {
                response.json().then(error => {
                    alert(`Failed to update issue: ${error.message}`);
                });
            }
        }).catch(err => {
            alert(`Error in sending data to server: ${err.message}`);
        })
    }

    onValidityChange(e, valid) {
        const invalidFields = Object.assign({}, this.state.invalidFields);
        if (!valid) {
            invalidFields[e.target.name] = true;
        } else {
            delete invalidFields[e.target.name];
        }
        this.setState({
            invalidFields
        })
    }

    onChange(e, convertedValue) {
        e.preventDefault();
        const issue = Object.assign({}, this.state.issue);
        const value = (convertedValue !== undefined) ? convertedValue : event.target.value;
        issue[event.target.name] = value;
        this.setState({ issue });
    }

    loadData() {
        fetch(`/api/issues/${this.props.match.params.id}`).then(response => {
            if (response.ok) {
                response.json().then(issue => {
                    issue.created = new Date(issue.created);
                    issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;
                    this.setState({ issue });
                });
            } else {
                response.json().then(error => {
                    alert(`Failed to fetch issue: ${error.message}`);
                })
            }
        }).catch(error => {
            alert(`Error in fetching data from server: ${error.message}`);
        })
    }

    render() {
        const { issue } = this.state;
        const validationMessage = Object.keys(this.state.invalidFields).length === 0 ? null : (
            <div className="error">
                Please correct invalid fields before submitting.
            </div>
        )
        return (
            <Card className="mt-4 mb-4">
                <Card.Header as={Card.Header}>
                    Edit Issue
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>ID</Form.Label>
                            <Col sm={10}>
                                <Form.Control readOnly plaintext disabled defaultValue={issue._id} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Created</Form.Label>
                            <Col sm={10}>
                                <Form.Control readOnly plaintext disabled defaultValue={issue.created ? issue.created.toDateString() : ''} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Status</Form.Label>
                            <Col sm={10}>
                                <Form.Control as="select" value={issue.status} onChange={this.onChangeStatus}>
                                    <option value="">(Any)</option>
                                    <option value="New">New</option>
                                    <option value="Open">Open</option>
                                    <option value="Assigned">Assigned</option>
                                    <option value="Fixed">Fixed</option>
                                    <option value="Verified">Verified</option>
                                    <option value="Closed">Closed</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Owner</Form.Label>
                            <Col sm={10}>
                                <Form.Control name="owner" value={issue.owner} onChange={this.onChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Effort</Form.Label>
                            <Col sm={10}>
                                <NumInput name="effort" value={issue.effort} onChange={this.onChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Effort</Form.Label>
                            <Col sm={10}>
                                <DateInput name="completionDate" value={issue.completionDate} onChange={this.onChange} onValidityChange={this.onValidityChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Title</Form.Label>
                            <Col sm={10}>
                                <Form.Control name="title" value={issue.title} onChange={this.onChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={{ span: 6, offset: 2}}>
                                <Button variant="primary" type="submit">Submit</Button>
                                <LinkContainer to="/issues">
                                    <Button variant="link">Back</Button>
                                </LinkContainer>
                            </Col>
                        </Form.Group>
                        {validationMessage}
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

IssueEdit.propTypes = {
    match: PropTypes.object.isRequired
}