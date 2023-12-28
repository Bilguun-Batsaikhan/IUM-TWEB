const mongoose = require('mongoose');

const ClubsSchema = new mongoose.Schema({
    club_id: {type: Number, required: true, unique: true},
    club_code: {type: String, required: true},
    name: {type: String, required: true},
    domestic_competition_id: {type: String, required: true},
    squad_size: {type: Number},
    average_age: {type: Number},
    foreigners_number: {type: Number},
    foreigners_percentage: {type: Number},
    national_team_players: {type: Number},
    stadium_name: {type: String},
    stadium_seats: {type: Number},
    net_transfer_record: {type: String},
    last_season: {type: String},
    url: {type: String},
});


// exporting the model
module.exports = mongoose.model('Clubs', ClubsSchema);
