// initialise dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// initialise constants
const app = express();
const port = process.env.PORT || 8670;
const router = express.Router();

// setup app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up mongoose
mongoose.connect(
    'mongodb://node:node@cluster0-shard-00-00-dhscv.mongodb.net:27017,cluster0-shard-00-01-dhscv.mongodb.net:27017,cluster0-shard-00-02-dhscv.mongodb.net:27017/admin?replicaSet=Cluster0-shard-0&ssl=true',
    { dbName: 'friends', useNewUrlParser: true }
).catch(console.error);

// set up API routes
router.get('/', function (req, res) {
    res.sendStatus(200);
});

// set up API base route
app.use('/friends', router);

// start server
app.listen(port);
console.log('Friends API server loaded on http://localhost:' + port);