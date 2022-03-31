const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Post = require('../models/post');
const { defaultConfiguration } = require('express/lib/application');

// New post
router.post('/new', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    username = jwt.verify(req.headers.authorization.split(' ')[1], config.secret).user.username

    let newPost = new Post({
        title: req.body.title,
        post: req.body.post,
        username: username
    });

    Post.addPost(newPost, (err, post) => {
        if (err) {
            return res.json({success: false, msg: 'Post creation failed'});
        } else {
            return res.json({success: true, msg: 'Post created'});
        }
    });
});

router.get('/all', (req, res, next) => {
    Post.find({}, (err, posts) =>{
        if (err) {
            throw err;
        }
        if (posts.lenght === 0) {
            return res.json({success: false, msg: 'Failed to fetch posts'});
        } else {
            return res.json({success: true, msg: 'Posts fetched', posts: posts});
        }
    });
});

module.exports = router;