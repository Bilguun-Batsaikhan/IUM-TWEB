var express = require('express');
var router = express.Router();
const axios = require('axios')

router.route('/club')
    .get(function (req, res) {
        res.render('club_valutation');
    })
    .post(function (req, res) {
        const clubId = req.body.club_id;
        axios.post('http://localhost:3001/valutation/club', {club_id: clubId
        })
            .then(json => {
                console.log("abc");
                const clubValutation = json.data.result;
                res.json({clubValutation});
            })
            .catch(err => {
                console.error('Errore nella chiamata Axios:', err);
                res.setHeader('Content-Type', 'application/json');
                res.status(505).json(err);
            });
    });

router.get('/test', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
