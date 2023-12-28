const mongoose = require('mongoose');

const ClubGames = new mongoose.Schema({
    game_id: {type: Number, required: true},
    club_id: {type: Number, required: true},
    own_goals: {type: Number},
    own_position: {type: Number},
    own_manager_name: {type: String},
    opponent_id: {type: Number, required: true},
    opponent_goals: {type: Number},
    opponent_position: {type: Number},
    opponent_manager_name: {type: String},
    hosting: {type: String},
    is_win: {type: Number}
});


// exporting the model
module.exports = mongoose.model('ClubGames', ClubGames);
