// initialise dependencies
const express = require('express');
const bodyParser = require('body-parser');

// initialise constants
const app = express();
const port = process.env.PORT || 8670;
const router = express.Router();

// setup app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up API routes
router.get('/', function (req, res) {
    res.sendStatus(200);
});

// set up API base route
app.use('/friends', router);

// start server
app.listen(port);
console.log('Friends API server loaded on http://localhost:' + port);