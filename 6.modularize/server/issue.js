'use strict';

const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true
};

const issueFieldType = {
    status: 'required',
    owner: 'required',
    created: 'required',
    title: 'required',
    completionDate: 'optional',
    effor: 'optional'
};

function validateIssue(issue) {
    for (const field in issueFieldType) {
        const type = issueFieldType[field]
        if (!type) {
            delete issue[field];
        } else if (type === 'required' && !issue[field]) {
            return `${field} is required`
        }
    }

    if (!validIssueStatus[issue.status]) return `${issue.status} is not a valid status.`;
    return null;
}

export default {
    validateIssue
}