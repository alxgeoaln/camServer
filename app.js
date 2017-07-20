//region Require modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.set('socketio', io);

const config = require('./config/database');
//endregion

//region Connect to database
mongoose.connect(config.database);

mongoose.connection.on('connected', function () {
    console.log('Connected to database', config.database);
});

mongoose.connection.on('error', function (err) {
    console.log('Database error', err)
});
//endregion


const port = process.env.PORT || 8080;

app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser Middleware
app.use(bodyParser.json());

//region Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
//endregion

//region require routes
const register = require('./routes/register/register');
const campaign = require('./routes/campaign/campaign');

app.use('/register', register);
app.use('/campaign', campaign);
//endregion

app.listen(port, function () {
    console.log('Magic happens on port', port);
});