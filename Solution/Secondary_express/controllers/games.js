const Model = require('../models/games');

/* it obtains all games of the competition specified by ID */
function getGamesByCompetitionId(competition_id) {
    return new Promise((resolve, reject) => {
        console.log(competition_id);
        // Assuming competition_id is already a string, if not, convert it to a string
        const competitionIdString = typeof competition_id === 'object' ? competition_id.competitionID : competition_id;

        console.log(competitionIdString);
        Model.find({ competition_id: competitionIdString })
            .select({
                home_club_name: 1,
                away_club_name: 1,
                home_club_goals: 1,
                away_club_goals: 1,
                date: 1,
                stadium: 1,
                // Add other fields you want to include
            })
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                console.error('Error fetching games by competition ID:', error);
                reject(error);
            });
    });
}



module.exports.getGamesByCompetitionId = getGamesByCompetitionId;