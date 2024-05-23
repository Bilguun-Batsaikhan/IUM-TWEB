var express = require('express');
var router = express.Router();
const axios = require('axios')

router.route('/club')
    .get(function (req, res) {
        res.render('club_valutation');
    })
    .post(function (req, res) {
        const clubId = req.body.club_id;
        let clubData;
        console.log(clubId);
        axios.post('http://localhost:3001/valutation/club', {club_id: clubId})
            .then(json => {
                clubData = json.data.result;
                return axios.post('http://localhost:8082/players/getplayersbyclub', {club_id: clubId});
            })
            .then(secondJson => {
                const playersData = secondJson.data;
                res.json({ clubData, playersData });
            })
            .catch(err => {
                console.error('Errore:', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            });
    });

router.route('/player')
    .get(function (req, res) {
        res.render('player_valutation');
    })
    .post(function (req, res) {
        const playerId = req.body.player_id;
        let playerData;
        axios.post('http://localhost:8082/players/getplayerbyid', {player_id: playerId})
            .then(json => {
                playerData = json.data;
                res.json({ playerData });
            })
            .catch(err => {
                console.error('Errore:', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            });
    });

router.route('/getAppearancesByPlayer')
    .post(function (req, res) {
        const playerId = req.body.player_id;
        let matchData;
        axios.post('http://localhost:3001/getAppearancesByPlayer', {player_id: playerId})
            .then(json => {
                matchData = json.data;
                res.json({ matchData });
            })
            .catch(err => {
                console.error('Errore:', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            });
    });

router.route('/getGamesByClub')
    .post(function (req, res) {
        const club_id = req.body.club_id;
        let matchData;
        axios.post('http://localhost:3001/getGamesByClubId', {club_id: club_id})
            .then(json => {
                matchData = json.data;
                res.json({ matchData });
            })
            .catch(err => {
                console.error('Errore:', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            });
    });

router.route('/getGamesResultsByGameId')
    .post(function (req, res) {
        const player_club_id = req.body.player_club_id;
        const match_data = req.body.match_data;
        //console.log('Received player_club_id:', player_club_id);
        //console.log('Received match_data:', match_data);

        axios.post('http://localhost:3001/getGamesResultsByGameId', {player_club_id: player_club_id,
        match_data: match_data})
            .then(json => {
                resultData = json.data;
                res.json({ resultData });
            })
            .catch(err => {
                console.error('Errore:', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            });
    });

module.exports = router;
