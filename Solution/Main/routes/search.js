var express = require('express');
var router = express.Router();
const axios = require('axios')

router.route('/')
    .get(function (req, res) {
        const searchQuery = req.query.search;

        axios.post('http://localhost:8082/players/getsearchplayer', { player_name: searchQuery })
            .then(response1 => {
                const playersData = response1.data;

                return axios.post('http://localhost:3001/clubSearch', { name: searchQuery })
                    .then(response2 => {
                        const clubsData = response2.data.result;
                        console.log("TEST" + JSON.stringify(clubsData));
                        //res.render('displayResults', { searchQuery, playersData, clubsData: JSON.stringify(clubsData.result, null, 2)});
                        res.render('displayResults', {
                            searchQuery,
                            playersData: JSON.stringify(playersData), // Converti playersData in JSON
                            clubsData: JSON.stringify(clubsData) // Converti clubsData in JSON
                        });
                    });
            })
            .catch(err => {
                console.error('Errore:', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            });
    });

module.exports = router;
