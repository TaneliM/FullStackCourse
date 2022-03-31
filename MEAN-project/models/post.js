const mongoose = require('mongoose');

// User Schema
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.getPostById = (id, callback) => {
    Post.findById(id, callback);
}

module.exports.getPostByUsername = (username, callback) => {
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addPost = (newPost, callback) => {
    newPost.save(callback);
}