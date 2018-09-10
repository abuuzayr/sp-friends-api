const Friend = require('./model');
const helper = require('../../helper');

const getFriend = async (id) => {
    const friend = await Friend.findById(id);
    return friend
};

module.exports = {
    getFriend: getFriend
};