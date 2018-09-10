const Friend = require('./model');
const helper = require('../../helper');

const getFriend = async (id) => {
    const friend = await Friend.findById(id);
    return friend
};

const getFriendByEmail = async (email) => {
    const friend = await Friend.findOne({
        'email': email
    })
    return friend
};

module.exports = {
    getFriend: getFriend,
    getFriendByEmail: getFriendByEmail
};