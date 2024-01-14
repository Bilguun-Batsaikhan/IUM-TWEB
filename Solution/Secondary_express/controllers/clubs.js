const Model = require('../models/clubs');

function insert(body) {
    return new Promise((resolve, reject) => {
        const mongoObj = new Model(body);
        mongoObj.save()
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.insert = insert;


function query(body) {
    return new Promise((resolve, reject) => {
        Model.find(body)
            .then(results => {
                results.forEach((club) => {
                    club.hide('_id');
                });
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.query = query;

/* it gets all clubs names */
function getClubNames() {
    return new Promise((resolve, reject) => {
        Model.find({})
            .then(results => {
                const clubNames = results.map((club) => club.name);
                resolve(clubNames);
            })
            .catch(error => {
                reject(error);
            });
    });
}
module.exports.getClubNames = getClubNames;

function getClubNamesForSearchBar(clubSearch) {
    return new Promise((resolve, reject) => {
        console.log(clubSearch +"Hello");
        const clubSearchString = "" + clubSearch;
        // Utilizza l'operatore $regex per cercare i club che contengono la parte del nome specificata
        Model.find({ name: { $regex: clubSearchString, $options: 'i' } }, { name: 1 })
            .then(results => {
                const clubNames = results.map((club) => club.name);
                resolve(clubNames);
            })
            .catch(error => {
                reject(error);
            });
    });
}
module.exports.getClubNamesForSearchBar= getClubNamesForSearchBar;



