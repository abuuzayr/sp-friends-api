const friend = require('./friend')

module.exports = {
    getFriend: friend.getFriend,
    getFriendByEmail: friend.getFriendByEmail,
    newFriend: friend.newFriend,
    connectFriend: friend.connectFriend,
    blockFriend: friend.blockFriend
};