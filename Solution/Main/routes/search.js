var express = require('express');
var router = express.Router();
const axios = require('axios')

// GET: Retrieves the search result page.
router.route('/').get(function (req, res) {
    res.render('search');
});
// POST: Fetches players for the search page.
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
// POST: Fetches clubs for the search page.
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


module.exports = router;
