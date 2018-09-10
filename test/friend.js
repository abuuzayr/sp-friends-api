process.env.NODE_ENV = 'test';

// init dependencies
const mongoose = require('mongoose');
const Friend = require('../api/friend/model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// init constants
const should = chai.should();

// init chai
chai.use(chaiHttp);

// parent block
describe('Friends', () => {
    // Empty the database before each test
    beforeEach((done) => {
        Friend.deleteMany({}, (err) => {
            done();
        });
    });

    describe('test friend api', () => {
        it('it should GET 200', (done) => {
            chai.request(server)
                .get('/friends')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});