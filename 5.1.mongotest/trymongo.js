const MongoClient = require('mongodb');
const co =  require('co')
const async = require('async');

const MONGO_CONNECTION_STRING = 'mongodb://localhost';
const MONGO_DATABASE_NAME = 'issuetracker';

function usage()  {
    console.log('Usage:')
    console.log('node', __filename, '<option>');
    console.log('Where option is one of:');
    console.log('  callbacks    Use the callbacks paradigm');
    console.log('  promises     Use the Promises paradigm');
    console.log('  generator    Use the Generator paradigm');
    console.log('  async        Use the async paradigm');
}

if (process.argv.length < 3) {
    console.log('Incorrect number of arguments');
    usage();
} else {
    if (process.argv[2] === 'callbacks') {
        testWithCallbacks();
    } else if (process.argv[2] === 'promises') {
        testWithPromises();
    } else if (process.argv[2] === 'generator') {
        testWithGenerator();
    } else if (process.argv[2] === 'async') {
        testWithAsync();
    } else {
        console.log('Invalid option:', process.argv[2]);
        usage();
    }
}

function testWithCallbacks() {
    MongoClient.connect(MONGO_CONNECTION_STRING, { useUnifiedTopology: true }, function(err, client) {
        if (err) throw err;
        const db = client.db(MONGO_DATABASE_NAME);

        db.collection('issues').find().toArray((err, docs) => {
            console.log(`Result of find: `, docs);
            client.close();
        })
    })
}

function testWithPromises() {
    let client;
    MongoClient.connect(MONGO_CONNECTION_STRING, { useUnifiedTopology: true }).then(connection => {
        client = connection
        const db = client.db(MONGO_DATABASE_NAME);
        return db.collection('issues').find();
    }).then(result => {
        return result.toArray();
    }).then(docs => {
        console.log('Result of find: ', docs);
        client.close();
    }).catch(err => {
        console.log('ERROR', err);
    })
}

function testWithGenerator() {
    co(function*() {
        const client = yield MongoClient.connect(MONGO_CONNECTION_STRING, { useUnifiedTopology: true });
        const db = client.db(MONGO_DATABASE_NAME);

        const docs = yield db.collection('issues').find().toArray();
        console.log('Result of find:', docs);

        client.close();
    }).catch(err => {
        console.log('ERROR', err);
    })
}

function testWithAsync()  {
    let client;
    async.waterfall([
        next => {
            MongoClient.connect(MONGO_CONNECTION_STRING, { useUnifiedTopology: true }, next)
        },
        (connection, next) => {
            client = connection;
            const db = client.db(MONGO_DATABASE_NAME);
            db.collection('issues').find().toArray(next);
        },
        (docs, next) => {
            console.log('Result of find:', docs);
            client.close();
            next(null, 'All Done');
        }
    ], (err, result) =>  {
        if (err) console.log('ERROR', err);
        else console.log(result);
    })
}