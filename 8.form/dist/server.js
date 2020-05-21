"use strict";

require("babel-polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongodb = require("mongodb");

var _issue = _interopRequireDefault(require("./issue.js"));

var _sourceMapSupport = _interopRequireDefault(require("source-map-support"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_sourceMapSupport["default"].install();

var app = (0, _express["default"])();
app.use(_express["default"]["static"]('static'));
app.use(_bodyParser["default"].json()); // MongoClient instance

var client;
var db;

if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');

  var webpackDevMiddleware = require('webpack-dev-middleware');

  var webpackHotMiddleware = require('webpack-hot-middleware');

  var config = require('../webpack.config');

  config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  var bundler = webpack(config);
  app.use(webpackDevMiddleware(bundler, {
    noInfo: true
  }));
  app.use(webpackHotMiddleware(bundler, {
    log: console.log
  }));
}

app.get('/api/issues', function (req, res) {
  db.collection('issues').find().toArray().then(function (issues) {
    var metadata = {
      total_count: issues.length
    };
    res.json({
      _metadata: metadata,
      records: issues
    });
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error: ".concat(err)
    });
  });
});
app.post('/api/issues', function (req, res) {
  var newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status) newIssue.status = 'New';

  var err = _issue["default"].validateIssue(newIssue);

  if (err) {
    res.status(422).json({
      message: "Invalid request: ".concat(err)
    });
    return;
  }

  db.collection('issues').insertOne(newIssue).then(function (result) {
    return db.collection('issues').find({
      _id: result.insertedId
    }).limit(1).next();
  }).then(function (newIssue) {
    res.json(newIssue);
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error: ".concat(err)
    });
  });
});

_mongodb.MongoClient.connect('mongodb://localhost', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err, connection) {
  if (err) throw err;
  client = connection;
  db = client.db('issuetracker'); // db.collection('issues').find().toArray((err, docs) => {
  //     console.log(`Result of find: `, docs);
  //     client.close();
  // })

  app.listen(3000, function () {
    console.log('App started on port 3000');
  });
});
//# sourceMappingURL=server.js.map