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

const newFriend = (email, res) => {
    getFriendByEmail(email).then((friend) => {
        if (!friend) {
            new Friend({email}).save(err => {
                if (err) {
                    helper.error(res, err);
                }
                res.json({ success: true });
            })
        } else {
            helper.error(
                res, 
                'Duplicate email - this user already exists');
        }
    })
    .catch((err) => {
        helper.error(res, err);
    });
}

module.exports = {
    getFriend: getFriend,
    getFriendByEmail: getFriendByEmail,
    newFriend: newFriend
};