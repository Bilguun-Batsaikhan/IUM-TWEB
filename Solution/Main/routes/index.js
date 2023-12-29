var express = require('express');
const path = require('path');
var router = express.Router();
//const clubsController = require('../controllers/clubs');
const axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/chat-static', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/chat.html'));
});


/* The nickname should be retrieved from the login page. */
var nickname = 'Admin';
/*
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
});*/
router.get('/chat', async (req, res) => {
  if (nickname !== null && typeof nickname !== 'undefined') {
    try {
      res.render('chat', { title: 'Chat', nickname });
    } catch (error) {
      res.render('error', { error: 'Error rendering chat', message: error.message });
    }
  } else {
    res.render('error', { error: 'login required', message: 'To use the chat, it is necessary to be logged in.' });
  }
});

/*router.post('/chat', async (req, res) => {
  try {
    const clubNames = await clubsController.getClubNames();
    res.json({ clubNames });
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Error retrieving club names', message: error.message });
  }
});*/
router.route('/chat')
    .post(function  (req, res) {
    //res.setHeader('Content-Type', 'application/json');
  axios.post('http://localhost:3001/chat')
      .then(json => {
        //console.log('Risposta dalla chiamata Axios:', json.data);
        //res.json(json.data.result);
          const clubNames = json.data.result;
          res.json({ clubNames });
      })
      .catch(err => {
        console.error('Errore nella chiamata Axios:', err);
        res.setHeader('Content-Type', 'application/json');
        res.status(505).json(err);
      });
});


module.exports = router;
