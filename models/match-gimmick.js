const mongoose = require('mongoose');

const matchTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rules: {
        type: String,
        required: true
    },
    riskLevel: {
        type: String,
        enum: ['Low', 'Moderate', 'High', 'Extreme'],
        required: true
    },
    popularity: {
        type: String,
        required: true
    }
});

const MatchType = mongoose.model('MatchType', matchTypeSchema);

module.exports = MatchType;