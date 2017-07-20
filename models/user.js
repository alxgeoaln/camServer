//region Require modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
//endregion

//User Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

//region User methods
module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByEmail = function (email, callback) {
    const query = {email: email};
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback)
        });
    });
};
//endregion