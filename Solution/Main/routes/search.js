var express = require('express');
var router = express.Router();
const axios = require('axios')

router.route('/').get(function (req, res) {
    res.render('search');
});

router.route('/searchPlayer').post(function (req, res) {
    const searchQuery = req.body.search;

    axios.post('http://localhost:8082/players/getsearchplayer', { player_name: searchQuery })
        .then(json => {
            const playersData = json.data;
            res.json({ playersData });
        })
        .catch(err => {
            console.error('Errore:', err);
            res.setHeader('Content-Type', 'application/json');
            res.status(505).json(err);
        });
});

router.route('/searchClub').post(function (req, res) {
    const searchQuery = req.body.search;

    axios.post('http://localhost:3001/clubSearch', { name: searchQuery })
        .then(json => {
            const clubsData = json.data.result;
            res.json({ clubsData });
        })
        .catch(err => {
            console.error('Errore:', err);
            res.setHeader('Content-Type', 'application/json');
            res.status(505).json(err);
        });
});

// router.route('/')
//     .get(function (req, res) {
//         const searchQuery = req.query.search;
//
//         axios.post('http://localhost:8082/players/getsearchplayer', { player_name: searchQuery })
//             .then(response1 => {
//                 const playersData = response1.data;
//
//                 return axios.post('http://localhost:3001/clubSearch', { name: searchQuery })
//                     .then(response2 => {
//                         const clubsData = response2.data.result;
//                         let clubsDataArray = [];
//                         // clubsData.forEach(club => {
//                         //     console.log(club.club_id);
//                         //     console.log(club.name);
//                         //     console.log(club._id);
//                         // });
//                         //
//                         // playersData.forEach(player => {
//                         //     console.log(player);
//                         // });
//                         // console.log("TEST" + JSON.stringify(clubsData));
//                         console.log("Players Data: " + JSON.stringify(playersData));
//                         res.render('display-results', { searchQuery, playersData, clubsData});
//                         // res.render('displayResults', {
//                         //     searchQuery,
//                         //     playersData: JSON.stringify(playersData), // Converti playersData in JSON
//                         //     clubsData: JSON.stringify(clubsData) // Converti clubsData in JSON
//                         // });
//                     });
//             })
//             .catch(err => {
//                 console.error('Errore:', err);
//                 res.setHeader('Content-Type', 'application/json');
//                 res.status(505).json(err);
//             });
//     });



module.exports = router;
