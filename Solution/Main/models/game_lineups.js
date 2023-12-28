const mongoose = require('mongoose');

const GameLineups = new mongoose.Schema({
    game_lineups_id: {type: String, required: true, unique: true},
    game_id: {type: Number, required: true},
    club_id: {type: Number, required: true},
    type: {type: String},
    number: {type: mongoose.Schema.Types.Mixed},
    player_id: {type: Number, required: true},
    player_name: {type: String},
    team_captain: {type: Number, required: true},
    position: {type: String}
});


// exporting the model
module.exports = mongoose.model('GameLineups', GameLineups);
