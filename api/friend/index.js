const friend = require('./friend')

module.exports = {
    getFriend: friend.getFriend,
    getFriendByEmail: friend.getFriendByEmail,
    newFriend: friend.newFriend,
    getAllFriends: friend.getAllFriends,
    commonFriends: friend.commonFriends,
    linkFriend: friend.linkFriend,
    blockFriend: friend.blockFriend,
    subscribeToFriend: friend.subscribeToFriend
};