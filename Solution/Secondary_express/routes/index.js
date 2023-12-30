var express = require('express');
var router = express.Router();
const clubsController = require('../controllers/clubs');
var bodyParser = require('body-parser');
router.use( bodyParser.json() );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/chat', async (req, res) => {
  try {
    const clubNames = await clubsController.getClubNames();
    res.json({result: clubNames });
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Error retrieving club names', message: error.message });
  }
});

module.exports = router;