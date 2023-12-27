const mongoose = require('mongoose');

const ClubsSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    clubId: {type: String, required: true, unique: true},
    clubCode: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    domesticCompetitionId: {type: String, required: true},
    squadSize: {type: Number, required: true},
    averageAge: {type: Number, required: true},
    foreignersNumber: {type: Number, required: true},
    foreignersPercentage: {type: Number, required: true},
    nationalTeamPlayers: {type: Number, required: true},
    stadiumName: {type: String, required: true},
    stadiumSeats: {type: Number, required: true},
    netTransferRecord: {type: Number, required: true},
    lastSeason: {type: String, required: true},
    url: {type: String, required: true},
});


// exporting the model
module.exports = mongoose.model('Clubs', ClubsSchema);
