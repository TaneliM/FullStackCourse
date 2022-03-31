const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

// Registering a new user
router.post(
    '/register',
    body('username').isLength({min: 1}),
    body('email').isEmail(),
    body('password').isLength({min: 5}), // More requirements can be added
    (req, res, next) => {
        const username = req.body.username;

        // Check for existing user
        User.getUserByUsername(username, (err, user) => {
            if (err) {
                throw err;
            }
            if (user) {
                return res.json({success: false, msg: 'User already exists'});
            } else {
                // Check for valid credentials
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    switch (errors.array()[0].param) {
                        case 'username':
                            return res.json({success: false, msg: 'Invalid username'});
                        case 'email':
                            return res.json({success: false, msg: 'Invalid email address'});
                        case 'password':
                            return res.json({success: false, msg: 'Invalid password'});
                    }
                }

                let newUser = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                });

                User.addUser(newUser, (err, user) => {
                    if (err) {
                        return res.json({success: false, msg: 'Registration failed'});
                    } else {
                        return res.json({success: true, msg: 'Registration successful'});
                    }
                });
            }
        });
    }
);

// Authenticate user
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!req.body.username || !req.body.password) {
        return res.json({success: false, msg: 'Incorrect login information'});
    }

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return res.json({success: false, msg: 'Incorrect login information'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                throw err;
            }
            if (isMatch) {
                const token = jwt.sign({user}, config.secret, {
                    expiresIn: 2592000 // 30 days
                });

                res.json({
                    success: true,
                    token: `JWT ${token}`,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Incorrect login information.'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    return res.json({user: req.user});
});

module.exports = router;