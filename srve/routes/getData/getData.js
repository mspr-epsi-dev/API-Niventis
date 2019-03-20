const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Pharmacie = require('../../models/pharmacieModel');

router.get('/hello', (req, res) => {
    
    res.send({hello: "hello"});

});

router.get('/getPharmacie', (req, res) => {
    
    Pharmacie.find({}, (error, docs) => {
        if(error){
            res.status(500);
            res.json(error);
            res.end();
        }else{
            res.status(200);
            res.json(docs);
            res.end();
        }

    })


});

module.exports = router;