var express = require('express');
const path = require('path');
var router = express.Router();
const clubsController = require('../controllers/clubs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/chat-static', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/chat.html'));
});


/* The nickname should be retrieved from the login page. */
var nickname = 'Admin';

router.get('/chat', async (req, res) => {
  if (nickname !== null && typeof nickname !== 'undefined') {
    try {
      const clubNames = await clubsController.getClubNames();
      res.render('chat', { title: 'Chat', nickname, clubNames });
    } catch (error) {
      res.render('error', { error: 'Error retrieving club names', message: error.message });
    }
  } else {
    res.render('error', { error: 'login required', message: 'To use the chat, it is necessary to be logged in.' });
  }
});

module.exports = router;
