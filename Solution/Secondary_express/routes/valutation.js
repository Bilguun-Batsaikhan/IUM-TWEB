var express = require('express');
var router = express.Router();
const clubValutationController = require('../controllers/club_valutation');
var bodyParser = require('body-parser');
router.use( bodyParser.json() );

router.post('/club', async (req, res) => {
    try {
        const clubId = req.body.club_id;
        console.log(clubId);
        const clubData = await clubValutationController.getClubById(clubId);
        res.json({result: clubData });
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: 'Error retrieving club names', message: error.message });
    }
});

module.exports = router;
