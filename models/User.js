const mongoose = require('mongoose');
var User = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneno: {
        type: String,
    },
    password: {
        type: String,
    },
    delete: {
        type: Number
    },
    unfriend: {
        type: Number
    },
    friendship: [String]
});

module.exports = mongoose.model('User', User)