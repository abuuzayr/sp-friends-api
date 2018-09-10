const Friend = require('./model');
const helper = require('../../helper');
const ObjectId = require('mongoose').Types.ObjectId;

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
            new Friend({ email }).save(err => {
                if (err) {
                    helper.error(res, err);
                }
                res.json({ success: true });
            })
        } else {
            helper.error(
                res,
                'Duplicate email - this user already exists'
            );
        }
    })
    .catch((err) => {
        helper.error(res, err);
    });
}

/**
 * Get all friends of a friend
 *
 * @param {string} email email of the friend to retrieve
 * @param {Object} res Express res object
 */
const getAllFriends = (email, res) => {
    getFriendByEmail(email).then((friend) => {
        if (friend) {
            let friends = [];
            friend.friends.forEach((v,k) => {
                getFriend(v).then((f) => {
                    friends.push(f.email);
                    if (k === friend.friends.length - 1) {
                        res.json({
                            success: true,
                            friends: friends,
                            count: friends.length
                        })
                    }
                })
            })
        } else {
            helper.error(
                res,
                'This user does not exist'
            );
        }
    })
    .catch((err) => {
        helper.error(res, err);
    });
}

// TODO: This should be in helper.js?
/**
 * Common function to compare two friends
 *
 * @param {string} first first email of the friend to link
 * @param {string} second second email of the friend to link
 * @param {Object} res Express res object
 * @param {Function} callback Callback function to call
 */
const compareFriends = (first, second, res, callback) => {
    getFriendByEmail(first).then((firstFriend) => {
        getFriendByEmail(second).then((secondFriend) => {
            if (!(firstFriend && secondFriend)) {
                helper.error(res, 'Either friend does not exist');
                return
            }
            if (callback) {
                callback(firstFriend, secondFriend, res);
            }
        })
        .catch((err) => helper.error(res, err))
    })
    .catch((err) => helper.error(res, err))
};

/**
 * Get common friends between two friends
 *
 * @param {string} first first email of the friend to link
 * @param {string} second second email of the friend to link
 * @param {Object} res Express res object
 */
const commonFriends = (first, second, res) => {
    compareFriends(first, second, res, (f, s, r) => {
        let commonArray = f.friends.filter((friend) => {
            return s.friends.includes(friend)
        })
        if (commonArray.length) {
            let commonArrayEmail = [];
            commonArray.forEach((v, k) => {
                getFriend(v).then((f) => {
                    commonArrayEmail.push(f.email);
                    if (k === commonArray.length - 1) {
                        r.json({
                            success: true,
                            friends: commonArrayEmail,
                            count: commonArray.length
                        })
                    }
                });
            })
        } else {
            helper.error(res, 'No common friends found');
        }
    })
}

/**
 * Add a connection between two friends that are in the db
 *
 * @param {string} first first email of the friend to link
 * @param {string} second second email of the friend to link
 * @param {Object} res Express res object
 */
const linkFriend = (first, second, res) => {
    compareFriends(first, second, res, (f, s, r) => {
        if (!f.friends.includes(s.id)) {
            Friend.updateOne(
                { '_id': ObjectId(f.id) },
                { $push: { friends: s.id } },
                () => {
                    // TODO: DRY this
                    if (!s.friends.includes(f.id)) {
                        Friend.updateOne(
                            { '_id': ObjectId(s.id) },
                            { $push: { friends: f.id } },
                            () => { r.json({ success: true }) }
                        );
                    }
                }
            );
        } else if (!s.friends.includes(f.id)) {
            // TODO: DRY this
            Friend.updateOne(
                { '_id': ObjectId(s.id) },
                { $push: { friends: f.id } },
                () => { r.json({ success: true }) }
            );
        } else {
            r.json({ success: true });
        }
    })
};

/**
 * Add a connection between two friends that are in the db
 *
 * @param {string} requestor email of the requestor
 * @param {string} target email of the friend to block
 * @param {Object} res Express res object
 */
const blockFriend = (requestor, target, res) => {
    compareFriends(requestor, target, res, (r, t, res) => {
        if (!r.blocks.includes(t.id)) {
            Friend.updateOne(
                { '_id': ObjectId(r.id) },
                { $push: { blocks: t.id } },
                () => res.json({ success: true })
            );
        } else {
            res.json({ success: true });
        }
    })
};

module.exports = {
    getFriend: getFriend,
    getFriendByEmail: getFriendByEmail,
    newFriend: newFriend,
    getAllFriends: getAllFriends,
    commonFriends: commonFriends,
    linkFriend: linkFriend,
    blockFriend: blockFriend
};