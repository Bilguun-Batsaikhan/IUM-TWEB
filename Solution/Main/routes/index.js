var express = require('express');
const path = require('path');
var router = express.Router();
const axios = require('axios')

// GET: Retrieves the home page.
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/competition-table', function (req, res, next) {
    res.render('competition-table');
});

router.get('/competition-league', function (req, res, next) {
    res.render('competition-league');
});
// GET: Retrieves the chat page.
// POST: Fetches club names to create chat rooms.
router.route('/chat')
    .get(function (req, res) {
            res.render('chat');
    })
    .post(function (req, res) {
        axios.post('http://localhost:3001/chat')
            .then(json => {
                const clubNames = json.data.result;
                res.json({clubNames});
            })
            .catch(err => {
                console.error('Errore nella chiamata Axios:', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            });
    });
// POST: Fetches countries for the "Competitions" section of the navbar.
router.route('/competition')
    .post(function (req, res) {
        axios.get('http://localhost:8082/competitions/countries')
            .then(json => {
                const countries = json.data;
                console.log(countries)
                res.json({countries});
            })
            .catch(err => {
                console.error('Errore nella chiamata Axios:', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            });
    });
// POST: Fetches competition types for the "Competitions" section of the navbar.
router.route('/competitionType')
    .post((req, res) => {
        const country = req.body.country;
        axios.get('http://localhost:8082/competitions/competitionTypes')
            .then(json => {
                const competitionTypes = json.data;
                res.json({competitionTypes});
            })
            .catch(err => {
                console.error('Error while retrieving competition Types in index router ', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            })
    });
// POST: Fetches competitions names by country for the "Competitions" section of the navbar.
router.route('/competitionNames')
    .post((req, res) => {
        let requestData = req.body;

        let apiUrl = 'http://localhost:8082/competitions/competitionNameByCountryOrType';
        let requestPayload = {};

        if (requestData.type === "country") {
            requestPayload = { country: requestData.value };
        } else if (requestData.type === "competitionType") {
            requestPayload = { competitionType: requestData.value };
        }
        axios.post(apiUrl, requestPayload)
            .then(response => {
                res.json({ data: response.data });
            })
            .catch(err => {
                console.error('Error while retrieving competition names in index router', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            });
    });
router.route('/retrieveGames')
    .post((req, res) => {
        const competition_id = req.body.competition_id;
        console.log(competition_id);
        axios.post('http://localhost:3001/competition/games', {competition_id: competition_id})
            .then(json => {
                const games = json.data;
                res.json({games});
            })
            .catch(err => {
                console.error('Error while retrieving games in index router ', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(500).json(err);
            })
    });
// fetch competition ID from SpringBoot by competition name
router.route('/retrieveCompetitionIDbyName')
    .post((req, res) => {
        const competitionName = req.body.name;
        console.log('Competition Name:', competitionName)
        axios.post('http://localhost:8082/competitions/competitionIDByName', {competitionName: competitionName})
            .then(json => {
                const competitionID = json.data;
                res.json({competitionID});
            })
            .catch(err => {
                console.error('Error while retrieving competition ID in index router ', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            })
    });
// POST: Fetches popular player names for the homepage.
router.route('/getpopularplayers')
    .post((req, res) => {
        axios.post('http://localhost:8082/players/getpopularplayers')
            .then(json => {
                const popPlayers = json.data;
                res.json({popPlayers});
            })
            .catch(err => {
                console.error('Error while retrieving games in index router ', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(500).json(err);
            })
    });

//fetch a graph given competition ID
router.route('/retrieveGraph')
    .get(async (req, res) => {
        const competitionId = req.query.competition_id; // Assuming the competition_id is in the query string
        console.log("competitionID: " + JSON.stringify(competitionId))
        try {
            // Make request to Flask server
            const response = await axios.get(`http://127.0.0.1:5000/generate_graph/${competitionId}`, {
                responseType: 'arraybuffer', // Specify the response type as arraybuffer to handle binary data
            });
            // Send the image data as the response to the client
            res.set('Content-Type', 'image/png');
            res.send(response.data);
        } catch (error) {
            console.error('Error making request to Flask server:', error);
            res.status(500).send('Internal Server Error');
        }
    });
// GET: Retrieves the error page.
router.get('/error', function (req, res, next) {
    res.render('error', {title: 'Page not found'});
});
// GET: Retrieves the login page.
router.post('/login', function(req, res, next) {
    res.render('login');
});
// GET: Retrieves the about page.
router.get('/about', function(req, res, next) {
    res.render('about');
});
// POST: Redirects to the home page after login.
router.post('/loginComplete', function(req, res, next) {
    res.render('index');
});
router.get('/login', function(req, res, next) {
    res.render('login');
});
router.post('/signUp', function(req, res, next) {
    res.render('signUp');
});
router.get('/signUp', function(req, res, next) {
    res.render('signUp');
});
router.post('/signUpComplete', function(req, res, next) {
    res.render('index');
});
module.exports = router;
