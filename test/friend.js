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

    // test base route
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

    // test new friend fail
    describe('test /friends/new to fail creation of new friend', () => {
        it('it should not create a friend without an email field', (done) => {
            let friend = {
                title: "not an email",
            }
            chai.request(server)
                .post('/friends/new')
                .send(friend)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.should.have.property('error_msg').eql('Invalid JSON body sent');
                    done();
                });
        });
    });
});