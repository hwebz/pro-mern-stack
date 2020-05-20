import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class IssueEdit extends React.Component {
    render() {
        return (
            <div>
                <p>This is a placeholder for editing issue {this.props.match.params.id}.</p>
                <Link to="/issues">Back to issue list</Link>
            </div>
        );
    }
}

IssueEdit.propTypes = {
    "match.params": PropTypes.object.isRequired
}