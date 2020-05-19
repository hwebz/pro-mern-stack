import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import Issue from './issue.js';

import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();

const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());

// MongoClient instance
let client;
let db;
if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const config = require('../webpack.config');
    config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const bundler = webpack(config);
    app.use(webpackDevMiddleware(bundler, { noInfo: true }));
    app.use(webpackHotMiddleware(bundler, { log: console.log }));
}

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

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.created = new Date();
    if (!newIssue.status) newIssue.status = 'New';

    const err = Issue.validateIssue(newIssue);
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