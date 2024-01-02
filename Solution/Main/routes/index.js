var express = require('express');
const path = require('path');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
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

router.route('/valutation/club')
    .get(function (req, res) {
        res.render('club_valutation');
    })
    .post(function (req, res) {
        const clubId = req.body.club_id;
        axios.post('http://localhost:3001/valutation/club', {club_id: clubId
        })
            .then(json => {
                const clubValutation = json.data.result;
                res.json({clubValutation});
            })
            .catch(err => {
                console.error('Errore nella chiamata Axios:', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            });
    });

router.get('/error', function (req, res, next) {
    res.render('error', {title: 'Page not found'});
});

module.exports = router;
