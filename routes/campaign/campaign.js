//region Require modules
const express = require('express');
const router = express.Router();
const Campaign = require('../../models/campaign');
//endregion

router.post('/', function (req, res) {
    const campaignTitle = req.body.campaignTitle;
    const campaignBody = req.body.campaignBody;

    const newCampaign = new Campaign({
        campaignTitle: campaignTitle,
        campaignBody: campaignBody
    });

    Campaign.saveCampaign(newCampaign, function (err, campaign) {
        if (err)
            console.log(err);
        else
            res.json({success: true, message: "Campaign has been succesfully added"});
    });
});

router.get('/', function (req, res) {
    Campaign.getCampaigns(function (err, campaigns) {
        if(err)
            res.json({success: false, message: 'Error occurred'})
        else{
            const io = req.app.get('socketio');
            io.emit('hi!');
            res.json(campaigns);
        }

    })
});


module.exports = router;