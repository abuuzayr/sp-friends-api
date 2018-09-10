const Friend = require('./model');
const helper = require('../../helper');

/**
 * Get friend by ID
 *
 * @param {string} id ID of the friend to retrieve
 * @return {Object} friend MongoDB object of the friend or false if error
 */
const getFriend = async (id) => {
    try {
        const friend = await Friend.findById(id);
        return friend
    } catch (err) {
        return false
    }
};

/**
 * Get friend by email
 *
 * @param {string} email email of the friend to retrieve
 * @return {Object} friend MongoDB object of the friend or false if error
 */
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

/**
 * Create a new friend if it does not already exist
 *
 * @param {string} email email of the friend to retrieve
 * @param {Object} res Express res object
 */
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

/**
 * Add a connection between two friends that are in the db
 *
 * @param {string} first first email of the friend to link
 * @param {string} second second email of the friend to link
 * @param {Object} res Express res object
 */
const linkFriend = (first, second, res) => {
    getFriendByEmail(first).then((firstFriend) => {
        getFriendByEmail(second).then((secondFriend) => {
            if (!(firstFriend && secondFriend)) {
                helper.error(res, 'Either friend does not exist');
                return
            }
            if (!firstFriend.friends.includes(secondFriend.id)) {
                Friend.updateOne(
                    { '_id': ObjectId(firstFriend.id) },
                    { $push: { friends: secondFriend.id } }
                );
            }
            if (!secondFriend.friends.includes(firstFriend.id)) {
                Friend.updateOne(
                    { '_id': ObjectId(secondFriend.id) },
                    { $push: { friends: firstFriend.id } }
                );
            }
            res.json({ success: true });
        })
        .catch((err) => helper.error(res, err))
    })
    .catch((err) => helper.error(res, err))
};

/**
 * Add a connection between two friends that are in the db
 *
 * @param {string} requestor email of the requestor
 * @param {string} target email of the friend to block
 * @param {Object} res Express res object
 */
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