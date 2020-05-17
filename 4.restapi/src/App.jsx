var contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the Issue Filter.</div>
        );
    }
}

const IssueRow = props => (
    <tr>
        <td>{props.issue.id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
        <td>{props.issue.title}</td>
    </tr>
)

class IssueTable extends React.Component {
    render() {
        const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />)
        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Completion</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    { issueRows }
                </tbody>
            </table>
        );
    }
}

class IssueAdd extends React.Component {

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
            status:  'New',
            created: new  Date()
        })
        form.owner.value = '';
        form.title.value = '';
    }

    render() {
        return (
            <div>
                <form name="issueAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="owner" placeholder="Owner" />
                    <input type="text" name="title" placeholder="Title" />
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}

class IssueList extends React.Component {
    
    constructor() {
        super();

        this.state = {
            issues: []
        }

        // this.createTestIssue = this.createTestIssue.bind(this);
        // setTimeout(this.createTestIssue, 2000);
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
            this.setState({
                issues: [
                    {
                        id: 1,
                        status: 'Open',
                        owner: 'Ravan',
                        created: new Date('2016-08-15'),
                        effort: 5,
                        completionDate: undefined,
                        title: 'Error in console when clicking Add'
                    },
                    {
                        id: 2,
                        status: 'Assigned',
                        owner: 'Eddie',
                        created: new Date('2016-08-16'),
                        effort: 14,
                        completionDate: new Date('2016-08-30'),
                        title: 'Missing bottom border on panel'
                    }
                ]
            })
        }, 500);
    }

    createIssue(newIssue) {
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        this.setState({
            issues: newIssues
        })
    }

    createTestIssue() {
        this.createIssue({
            status: 'New',
            owner: 'Pieta',
            created: new Date(),
            title: 'Completion date should be optional'
        });
    }

    render() {
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </div>
        );
    }
}

ReactDOM.render(<IssueList />, contentNode);