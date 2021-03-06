const mongoose = require('mongoose');
const { Schema } = mongoose;

const FriendSchema = new Schema({
    email: String,
    friends: [String],
    blocks: [String],
    subscribers: [String]
});

module.exports = mongoose.model('Friend', FriendSchema);