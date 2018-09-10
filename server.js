// initialise dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const friend = require('./api/friend');
const helper = require('./helper');

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
    res.status(200).json({ message: 'Friends API Status OK' });
});

// create a new friend/user (accessed via POST /friend/new)
router.route('/new')
    .post((req, res) => {
        // check if request body sent has the information we need
        if (req.body.email) {
            friend.newFriend(req.body.email, res);
        } else {
            helper.error(res, 'Invalid JSON body sent');
        }
    });

// create a new friend link (accessed via POST /friend/link)
router.route('/link')
    .post((req, res) => {
        // check if request body sent has the information we need
        let friends = req.body.friends;
        if (friends && friends.constructor === Array && 2 === friends.length) {
            friend.linkFriend(
                friends[0],
                friends[1],
                res
            );
        } else {
            helper.error(res, 'Invalid JSON body sent');
        }
    });

// create route to block a friend (accessed via POST /friend/block)
router.route('/block')
    .post((req, res) => {
        // check if request body sent has the information we need
        if (req.body.requestor && req.body.target) {
            friend.blockFriend(
                req.body.requestor,
                req.body.target,
                res
            );
        } else {
            helper.error(res, 'Invalid JSON body sent');
        }
    });

// create route to return a list of friends (accessed via POST /friend/list)
router.route('/list')
    .post((req, res) => {
        // check if request body sent has the information we need
        if (req.body.email) {
            friend.getAllFriends(req.body.email, res);
        } else {
            helper.error(res, 'Invalid JSON body sent');
        }
    });

// create route to return common friends (accessed via POST /friend/common)
router.route('/common')
    .post((req, res) => {
        // check if request body sent has the information we need
        let friends = req.body.friends;
        if (friends && friends.constructor === Array && 2 === friends.length) {
            friend.commonFriends(
                friends[0],
                friends[1],
                res
            );
        } else {
            helper.error(res, 'Invalid JSON body sent');
        }
    });

// create route to block a friend (accessed via POST /friend/block)
router.route('/subscribe')
    .post((req, res) => {
        // check if request body sent has the information we need
        if (req.body.requestor && req.body.target) {
            friend.subscribeToFriend(
                req.body.requestor,
                req.body.target,
                res
            );
        } else {
            helper.error(res, 'Invalid JSON body sent');
        }
    });

// set up API base route
app.use('/friends', router);

// start server
app.listen(port);
console.log('Friends API server loaded on http://localhost:' + port);