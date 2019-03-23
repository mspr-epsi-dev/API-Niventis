const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Pharmacie = require('../models/pharmacieModel');

router.get('/hello', (req, res) => {
    
    res.send({hello: "hello"});

});

router.post('/savePharmacie', (req, res) => {

    var pharmacie = new Pharmacie(req.body);
    
    pharmacie.save((err, doc) => {

        if(err){

            res.status(500, {"Content-Type": "application/json"}).send(err);

        }else{

            res.status(200, {"Content-Type": "application/json"}).send(doc);

        }

    });

});

router.get('/getPharmacies', (req, res) => {
    
    Pharmacie.find({}, (error, doc) => {
        if(error){
            res.status(500, {"Content-Type": "application/json"}).send(err);
        }else{
            res.status(200, {"Content-Type": "application/json"}).send(doc);
        }

    })


});

router.get('/getPharmacie', (req, res) => {

    Pharmacie.findById(req.query.id, (err,doc) => {

        if(err){

            res.status(500, {"Content-Type": "application/json"}).send(err);

        }else{

            res.status(200, {"Content-Type": "application/json"}).send(doc);

        }

    });

});

router.delete('/pharmacie', (req,res) => {
   
    Pharmacie.delete(req.query.id, (err, doc) =>{

        if(err){

            res.status(500, {"Content-Type": "application/json"}).send(err);

        }else{

            res.status(200, {"Content-Type": "application/json"}).send(doc);

        }
    })

});

module.exports = router;