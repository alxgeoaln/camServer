//region Require modules
const mongoose = require('mongoose');
//endregion


const campaignSchema = mongoose.Schema({
    campaignTitle: {
        type: String,
        required: true
    },
    campaignBody: {
        type: String,
        required: true
    }
});

const Campaign = module.exports = mongoose.model('Campaign', campaignSchema);

//region Campaign methods
module.exports.saveCampaign = function (newCampaign, callback) {
    newCampaign.save(callback);
};

module.exports.getCampaigns = function (callback) {
    Campaign.find({}).select({}).exec(callback)
};
//endregion