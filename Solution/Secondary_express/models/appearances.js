const mongoose = require('mongoose');

const Appearances = new mongoose.Schema({
    appearance_id: {type: String, required: true},
    game_id: {type: Number, required: true},
    player_id: {type: Number, required: true},
    player_club_id: {type: Number, required: true},
    player_current_club_id: {type: Number, required: true},
    date: {type: Date},
    player_name: {type: String},
    competition_id: {type: String, required: true},
    yellow_cards: {type: Number},
    red_cards: {type: Number},
    goals: {type: Number},
    assists: {type: Number},
    minutes_played: {type: Number}
});


// exporting the model
module.exports = mongoose.model('Appearances', Appearances);
