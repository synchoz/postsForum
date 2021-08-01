const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    subject:
    {
        type:String,
        required: true
    },
    replies:
    {
        type:Number,
        min: 0
    },
    author:
    {
        type:String,
        required: true
    },
    posted:
    {
        type: String,
        required: true
    },
    posttext:
    {
        type:String,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;