var express = require('express');
var router = express.Router();
const gamesController = require('../controllers/games');
const clubsController = require('../controllers/clubs');
const appearancesController = require('../controllers/appearances');
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

router.post('/competition/games', async (req, res) => {
  try {
    const competitionId = req.body.competition_id;
    const games = await gamesController.getGamesByCompetitionId(competitionId);
    res.json({result: games });
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Error retrieving club names', message: error.message });
  }
});

router.post('/clubSearch', async (req, res) => {
  try {
    // Parse the request body
    const clubSearch = req.body.name;
    // Wait for the promise from the 'res.json' call to resolve before accessing the 'clubSearch' property
    const clubNamesSearch = await clubsController.getClubNamesForSearchBar(clubSearch);
    res.json({ result: clubNamesSearch });
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Error retrieving club names for bar search', message: error.message });
  }
});

router.post('/getAppearancesByPlayer', async (req, res) => {
  try {
    // Parse the request body

   const appearancesPlayer = req.body.player_id;

    // Wait for the promise from the 'res.json' call to resolve before accessing the 'clubSearch' property
    const appearances = await appearancesController.getAppearancesByPlayer(appearancesPlayer);
    res.json({ result: appearances });
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Error retrieving club names for bar search', message: error.message });
  }
});

router.post('/getAppearancesByCompetitions', async (req, res) => {
  try {
    const appearancesCompetitions = req.body.competitions_id;
    // Wait for the promise from the 'res.json' call to resolve before accessing the 'clubSearch' property
    const appearances = await appearancesController.getAppearancesByCompetitionId(appearancesCompetitions);
    res.json({ result: appearances });
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Error retrieving club names for bar search', message: error.message });
  }
});

router.post('/getGamesByClubId', async (req, res) => {
  try {
    const club_id = req.body.club_id;
    const games = await gamesController.getGamesByClubId(club_id);
    res.json({ result: games});
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Error retrieving club names for bar search', message: error.message });
  }
});

router.route('/getGamesResultsByGameId')
    .post(async function (req, res) {
      try {
      const player_club_id = req.body.player_club_id;
      const match_data = req.body.match_data;


        const resultData = await gamesController.getGamesResultsByGameId(player_club_id, match_data);
        res.json({ result: resultData });
      } catch (err) {
        console.error('Errore:', err);
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: 'Error retrieving game results', message: err.message });
      }
    });

module.exports = router;
