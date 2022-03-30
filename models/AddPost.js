const mongoose = require('mongoose');
var AddPost = new mongoose.Schema({
        title: String,
        content: String,
        imageURL: String,
        user: String,
        status:String,
        countSee:String,
        userId:String,
});

module.exports = mongoose.model('AddPost', AddPost)