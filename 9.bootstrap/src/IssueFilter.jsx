import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

export default class IssueFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.initFilter.status || '',
      effort_gte: props.initFilter.effort_gte || '',
      effort_lte: props.initFilter.effort_lte || '',
      changed: false
    };

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
    this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.initFilter.status || '',
      effort_gte: newProps.initFilter.effort_gte || '',
      effort_lte: newProps.initFilter.effort_lte || '',
      changed: false
    })
  }

  onChangeStatus(e) {
    e.preventDefault();
    this.setState({
      status: e.target.value,
      changed: true
    });
  }

  onChangeEffortGte(e) {
    e.preventDefault();
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({
        effort_gte: e.target.value,
        changed: true
      });
    }
  }

  onChangeEffortLte(e) {
    e.preventDefault();
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({
        effort_lte: e.target.value,
        changed: true
      })
    }
  }

  applyFilter() {
    let newFilter = {};
    let query = '';
    if (this.state.status) newFilter.status = this.state.status;
    if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
    if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
    Object.keys(newFilter).forEach((f, fIndex) => {
      query += `${fIndex === 0 ? '?' : '&'}${f}=${newFilter[f]
      }`
    })
    this.props.setFilter(query);
  }

  clearFilter(e) {
    e.preventDefault();
    this.props.setFilter();
  }

  resetFilter(e) {
    e.preventDefault();
    this.setState({
      status: this.props.initFilter.status || '',
      effort_gte: this.props.initFilter.effort_gte || '',
      effort_lte: this.props.initFilter.effort_lte || '',
      changed: false
    })
  }

  render() {
    const Separator = () => <span> | </span>;
    return (
      <Row>
        <Col xs={6} sm={4} md={3} lg={2}>
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" value={this.state.status} onChange={this.onChangeStatus}>
            <option value="">(Any)</option>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Fixed">Fixed</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
          </Form.Control>
        </Form.Group>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <Form.Group>
            <Form.Label>Effort</Form.Label>
            <InputGroup>
              <Form.Control value={this.state.effort_gte} onChange={this.onChangeEffortGte} />
              <InputGroup.Prepend>
                <InputGroup.Text>-</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control value={this.state.effort_lte} onChange={this.onChangeEffortLte} />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col xs={6} sm={4} md={3} lg={3}>
          <Form.Group>
            <Form.Label>&nbsp;</Form.Label>
            <Form.Row>
              <Col>
                <Button block variant="primary" onClick={this.applyFilter}>Apply</Button>
              </Col>
              <Col>
                <Button block variant="warning" onClick={this.resetFilter} disabled={!this.state.changed}>Reset</Button>
              </Col>
              <Col>
                <Button block variant="warning" onClick={this.clearFilter}>Clear</Button>
              </Col>
            </Form.Row>
          </Form.Group>
        </Col>
      </Row>
    );
  }
}

IssueFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  initFilter: PropTypes.object.isRequired
}