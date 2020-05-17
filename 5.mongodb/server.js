const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());

// MongoClient instance
let client;
let db;

app.get('/api/issues', (req, res) => {
    db.collection('issues').find().toArray().then(issues => {
        const metadata = {
            total_count: issues.length
        };
    
        res.json({
            _metadata: metadata,
            records: issues
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: `Internal Server Error: ${err}`
        })
    })
})

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
    title: 'required'
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

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.created = new Date();
    if (!newIssue.status) newIssue.status = 'New';

    const err = validateIssue(newIssue);
    if (err) {
        res.status(422).json({
            message: `Invalid request: ${err}`
        })
        return;
    }
    
    db.collection('issues').insertOne(newIssue).then(result => {
        return db.collection('issues').find({ _id: result.insertedId }).limit(1).next()
    }).then(newIssue => {
        res.json(newIssue)
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: `Internal Server Error: ${err}`
        })
    })
})

MongoClient.connect('mongodb://localhost', { useNewUrlParser: true, useUnifiedTopology: true }, (err, connection) => {
    if (err) throw err;
    client = connection;
    db = client.db('issuetracker');

    // db.collection('issues').find().toArray((err, docs) => {
    //     console.log(`Result of find: `, docs);
    //     client.close();
    // })

    app.listen(3000, function() {
        console.log('App started on port 3000');
    });
})