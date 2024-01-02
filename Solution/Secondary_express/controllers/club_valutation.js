const Model = require('../models/clubs');

/* it obtains all information of the club specified by ID */
function getClubById(clubId) {
    return new Promise((resolve, reject) => {
        Model.findOne({club_id: clubId})
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.getClubById = getClubById;


