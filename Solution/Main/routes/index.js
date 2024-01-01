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

router.get('/valutation/club', (req, res) => {
    res.render('club_valutation');
});

router.get('/error', function (req, res, next) {
    res.render('error', {title: 'Page not found'});
});

module.exports = router;
