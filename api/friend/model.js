const mongoose = require('mongoose');
const { Schema } = mongoose;

const FriendSchema = new Schema({
    email: String,
    friends: [Number],
    blocks: [Number]
});

module.exports = mongoose.model('Friend', FriendSchema);