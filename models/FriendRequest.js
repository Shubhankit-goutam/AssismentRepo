const mongoose = require('mongoose');
var FriendRequestSchema = new mongoose.Schema({
    friendId: {
        type: String,
        required: true
    },
    requester: {
        type: Number,
        required: true
    },
    recipient: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('FriendRequestSchema', FriendRequestSchema)     