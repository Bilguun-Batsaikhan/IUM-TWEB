var express = require('express');
var router = express.Router();
const axios = require('axios')

router.route('/')
    .get(function (req, res) {
        //http://localhost:3000/search?search=DATI_IN_INPUT
        //DATI_IN_INPUT dovrebbe essere il testo della search bar
        //la search bar di conseguenza dovrebbe avere un navigate to l'indirizzo scritto sopra
        const searchQuery = req.query.search;
        
        res.render('displayResults', {searchQuery});
    });

module.exports = router;
