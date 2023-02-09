/**
 * Require statements
 */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express(); // Express variable.

/**
 * Routes
 */
const UserApi = require('./routes/user-api');
const SessionApi = require('./routes/session-api');
const SecurityQuestionApi = require('./routes/security-question-api')

/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

// default server port value.
const PORT = process.env.PORT || 3000;

// TODO: This line will be replaced with your database connection string (including username/password).
const CONN = 'mongodb+srv://superadmin:s3cret@cluster0-lujih.mongodb.net/bcrs?retryWrites=true&w=majority';

/**
 * Database connection.
 */
mongoose.connect(CONN).then(() => {
  console.log('Connection to the database was successful');
}).catch(err => {
  console.log('MongoDB Error: ' + err.message);
});

/**
 * APIs
 */
//app.use('/api/users', UserApi);
//app.use('api/session', SessionApi);
app.set('/api/security-questions', SecurityQuestionApi)

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log('Application started and listening on PORT: ' + PORT);
})
