var express = require('express');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/chat-static', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/chat.html'));
});

/* The nickname should be retrieved from the login page.
   The list of clubs should be retrieved from the database.
*/
var nickname = 'Admin';
const clubs = [
  { name: "Juventus",
  },
  {
    name: "Inter",
  },
  {
    name: "Milan",
  },
];
router.get('/chat', (req, res) => {
  if (nickname !== null && typeof nickname !== 'undefined') {
    res.render('chat', { title: 'Chat', nickname, clubs });
  } else {
    res.render('error', { error: 'login required', message: 'To use the chat, it is necessary to be logged in.' });
  }
});

module.exports = router;
