const Friend = require('./model');
const helper = require('../../helper');

const getFriend = async (id) => {
    try {
        const friend = await Friend.findById(id);
        return friend
    } catch (err) {
        return false
    }
};

const getFriendByEmail = async (email) => {
    try {
        const friend = await Friend.findOne({
            'email': email
        })
        return friend
    } catch (err) {
        return false
    }
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

const linkFriend = (first, second) => {
    getFriendByEmail(first).then((firstFriend) => {
        getFriendByEmail(second).then((secondFriend) => {
            if (!(firstFriend && secondFriend)) {
                helper.error(res, 'Either friend does not exist');
                return
            }
            if (!firstFriend.friends.includes(secondFriend.id)) {
                firstFriend.update({
                    friends: firstFriend.friends.push(secondFriend.id)
                })
            }
            if (!secondFriend.friends.includes(firstFriend.id)) {
                secondFriend.update({
                    friends: secondFriend.friends.push(firstFriend.id)
                })
            }
        });
    });
};

const blockFriend = (first, second) => {
    getFriendByEmail(first).then((firstFriend) => {
        getFriendByEmail(second).then((secondFriend) => {
            if (!(firstFriend && secondFriend)) {
                return { status: 'Either friend does not exist' }
            }
            if (!firstFriend.blocks.includes(secondFriend.id)) {
                firstFriend.update({
                    blocks: firstFriend.blocks.push(secondFriend.id)
                })
            }
            if (!secondFriend.blocks.includes(firstFriend.id)) {
                secondFriend.update({
                    blocks: secondFriend.blocks.push(firstFriend.id)
                })
            }
        });
    });
};

module.exports = {
    getFriend: getFriend,
    getFriendByEmail: getFriendByEmail,
    newFriend: newFriend,
    linkFriend: linkFriend,
    blockFriend: blockFriend
};