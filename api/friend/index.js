const friend = require('./friend')

module.exports = {
    getFriend: friend.getFriend,
    getFriendByEmail: friend.getFriendByEmail,
    newFriend: friend.newFriend,
    linkFriend: friend.linkFriend,
    blockFriend: friend.blockFriend
};