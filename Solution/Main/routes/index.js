var express = require('express');
const path = require('path');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/competition-table', function (req, res, next) {
    res.render('competition-table');
});

/* The nickname should be retrieved from the login page. */
var nickname = 'Admin';
/* GET chat page. */
router.route('/chat')
    .get(function (req, res) {
        if (nickname !== null && typeof nickname !== 'undefined') {
            try {
                res.render('chat', {title: 'Chat', nickname});
            } catch (error) {
                res.render('error', {error: 'Error rendering chat', message: error.message});
            }
        } else res.render('error', {
            error: 'login required',
            message: 'To use the chat, it is necessary to be logged in.'
        });
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
//fetch countries
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

router.route('/competitionNames')
    .post((req, res) => {
        const country = req.body.country;
        axios.post('http://localhost:8082/competitions/countriesData', {country: country})
            .then(json => {
                const countryData = json.data;
                res.json({countryData});
            })
            .catch(err => {
                console.error('Error while retrieving competition Names in index router ', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            })
    })

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

//fetch competition ID from SpringBoot then return it
router.route('/retrieveCompetitionID')
    .post((req, res) => {
        const competitionName = req.body.name;
        const country_name = req.body.country_name;
        axios.post('http://localhost:8082/competitions/competitionID', {country: country_name, name: competitionName})
            .then(json => {
                const competitionID = json.data;
                res.json({competitionID});
            })
            .catch(err => {
                console.error('Error while retrieving competition ID in index router ', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            })
    })

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

router.get('/error', function (req, res, next) {
    res.render('error', {title: 'Page not found'});
});

router.post('/login', function(req, res, next) {
    res.render('login');
});
router.get('/login', function(req, res, next) {
    res.render('login');
});
router.post('/loginComplete', function(req, res, next) {
    res.render('index');
});
router.post('/signUp', function(req, res, next) {
    res.render('signUp');
});
router.post('/signUpComplete', function(req, res, next) {
    res.render('index');
});
module.exports = router;
