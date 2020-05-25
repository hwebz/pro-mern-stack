import React from 'react';
import { Form, FormControl, Button, Col } from 'react-bootstrap';

export default class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    });
    form.owner.value = '';
    form.title.value = '';
  }

  render() {
    return (
      <div>
        <Form name="issueAdd" onSubmit={this.handleSubmit}>
          <Form.Row>
            <Col>
              <FormControl name="owner" placeholder="Owner" />
            </Col>
            <Col>
              <FormControl name="title" placeholder="Title" />
            </Col>
            <Col>
              <Button type="submit" variant="primary">Add</Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    );
  }
}
