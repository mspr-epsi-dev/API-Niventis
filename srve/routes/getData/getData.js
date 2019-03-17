const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Pharmacie = require('../../models/pharmacieModel');

router.get('/hello', (req, res) => {
    
    res.send({hello: "hello"});

});

router.get('/getPharmacie', (req, res) => {
    
    Pharmacie.find({}, (error, docs) => {
        res.send(docs);
    })


});

module.exports = router;