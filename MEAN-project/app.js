const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');

// Connecting to the database
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log(`Connected to database ${config.database}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Database error: ${err}`);
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session()); // Requires an older version of passport to work
require('./config/passport')(passport);

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
const users = require('./routes/users');
app.use('/users', users);

const posts = require('./routes/posts');
app.use('/posts', posts);

app.get('/', (req, res) => {
    res.send("There's nothing here.");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

// start server on PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});