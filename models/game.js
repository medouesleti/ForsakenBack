const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    score: { type: String, required: true },
    headshots: { type: String, required: true },
    kills: { type: String, required: true }
});

module.exports = mongoose.model('Game', gameSchema);
