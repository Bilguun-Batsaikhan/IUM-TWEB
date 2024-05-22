const Model = require('../models/Appearances');

/* it obtains all Appearances of the competition specified by ID */
function getAppearancesByPlayer(player_id) {
    return new Promise((resolve, reject) => {
        console.log("Querying for player_id:", player_id); // Log per debug
        Model.find({ player_id: player_id })
            .sort({ date: -1 })
            .then(results => {
                console.log("Query results:", results); // Log per debug
                resolve(results);
            })
            .catch(error => {
                console.error("Query error:", error); // Log per debug
                reject(error);
            });
    });
}

module.exports.getAppearancesByCompetitionId = getAppearancesByCompetitionId;

function getAppearancesByCompetitionId(competition_id) {
    return new Promise((resolve, reject) => {// Log per debug
        Model.find({ competition_id: competition_id })
            .then(results => {
                console.log("Query results:", results); // Log per debug
                resolve(results);
            })
            .catch(error => {
                console.error("Query error:", error); // Log per debug
                reject(error);
            });
    });
}

module.exports.getAppearancesByPlayer = getAppearancesByPlayer;
