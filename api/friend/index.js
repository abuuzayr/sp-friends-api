const friend = require('./friend')

module.exports = {
    getFriend: friend.getFriend,
    getFriendByEmail: friend.getFriendByEmail,
    newFriend: friend.newFriend,
    getAllFriends: friend.getAllFriends,
    linkFriend: friend.linkFriend,
    blockFriend: friend.blockFriend
};