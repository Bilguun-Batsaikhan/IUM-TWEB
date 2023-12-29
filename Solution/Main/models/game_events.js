const mongoose = require('mongoose');

const GameEvents = new mongoose.Schema({
    game_event_id: {type: String, required: true},
    date: {type: Date},
    game_id: {type: Number, required: true},
    minute: {type: Number},
    type: {type: String},
    club_id: {type: Number, required: true},
    player_id: {type: Number, required: true},
    description: {type: String},
    player_in_id: {type: Number. required: true},
    player_assist_id: {type: Number, required: true}
});


// exporting the model
module.exports = mongoose.model('GameEvents', GameEvents);
