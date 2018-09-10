// initialise dependencies
const express = require('express');

// initialise constants
const app = express();
const port = process.env.PORT || 8670;
const router = express.Router();

// set up API routes
router.get('/', function (req, res) {
    res.sendStatus(200);
});

// set up API base route
app.use('/friends', router);

// start server
app.listen(port);
console.log('Friends API server loaded on http://localhost:' + port);