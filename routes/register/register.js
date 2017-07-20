//region Require modules
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
//endregion

router.post('/', function (req, res) {
    var newCampaign = new Campaign({
        campaignTitle: req.body.campaignTitle,
        campaignBody: req.body.campaignBody
    });

    User.addUser(newUser, function (err, user) {
        if (err)
            res.json({success: false, message: 'Failed to register user'});
        else
            res.json({success: true, message: 'User registered'});
    });
});

module.exports = router;