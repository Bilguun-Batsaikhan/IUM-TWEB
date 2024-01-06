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


router.get('/test', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
