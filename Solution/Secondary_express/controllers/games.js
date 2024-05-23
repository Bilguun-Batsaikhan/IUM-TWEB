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
                home_club_id: 1,
                away_club_id: 1
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

function getGamesByClubId(club_id) {
    return new Promise((resolve, reject) => {
        console.log(club_id);

        Model.find({
            $or: [
                { home_club_id: club_id },
                { away_club_id: club_id }
            ]
        })
            .select({
                game_id: 1,
                home_club_name: 1,
                away_club_name: 1,
                home_club_goals: 1,
                away_club_goals: 1,
                home_club_id: 1,
                away_club_id: 1
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

async function getGamesResultsByGameId(player_club_id, match_data) {
    try {
        // Estrai tutti i game_id dai match_data
        const gameIds = match_data.map(match => match.game_id);

        // Trova tutte le partite che corrispondono ai game_id
        const games = await Model.find({ game_id: { $in: gameIds } })
            .select({
                game_id: 1,
                home_club_name: 1,
                away_club_name: 1,
                home_club_goals: 1,
                away_club_goals: 1,
                home_club_id: 1,
                away_club_id: 1
            });

        // Crea una lista di game_id trovati
        const foundGameIds = games.map(game => game.game_id);

        // Mappa i risultati con i dettagli desiderati
        const processedResults = match_data.map(match => {
            // Verifica se il game_id è presente nella lista dei game_id trovati
            const matchFound = foundGameIds.includes(match.game_id);
            if (matchFound) {
                // Trova il gioco corrispondente
                const game = games.find(g => g.game_id === match.game_id);
                return {
                    ...match,
                    home_club_name: game.home_club_name,
                    away_club_name: game.away_club_name,
                    home_club_goals: game.home_club_goals,
                    away_club_goals: game.away_club_goals,
                    home_club_id: game.home_club_id,
                    away_club_id: game.away_club_id,
                    match_found: true
                };
            } else {
                return {
                    ...match,
                    match_found: false
                };
            }
        });

        return processedResults;
    } catch (error) {
        console.error('Error fetching games by game IDs:', error);
        throw error;
    }
}


module.exports.getGamesByClubId = getGamesByClubId;
module.exports.getGamesByCompetitionId = getGamesByCompetitionId;
module.exports.getGamesResultsByGameId = getGamesResultsByGameId;
