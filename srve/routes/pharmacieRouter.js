const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Pharmacie = require('../models/pharmacieModel');
const route = require('./pharmacieRoutes');

router.get(route.hello, (req, res) => {
    
    res.send({hello: "hello"});

});

router.post(route.savePharmacie, (req, res) => {

    var pharmacie = new Pharmacie(req.body);
    
    pharmacie.save((err, doc) => {

        if(err){

            res.status(500, {"Content-Type": "application/json"}).send(err);

        }else{

            res.status(200, {"Content-Type": "application/json"}).send(doc);

        }

    });

});

router.get(route.getAllPharmacies, (req, res) => {
    
    Pharmacie.find({}, (error, doc) => {
        if(error){
            res.status(500, {"Content-Type": "application/json"}).send(err);
        }else{
            res.status(200, {"Content-Type": "application/json"}).send(doc);
        }

    })


});

router.get(route.getPharmacieById, (req, res) => {

    Pharmacie.findById(req.query.id, (err,doc) => {

        if(err){

            res.status(500, {"Content-Type": "application/json"}).send(err);

        }else{

            res.status(200, {"Content-Type": "application/json"}).send(doc);

        }

    });

});

router.delete(route.deletePharmacie, (req,res) => {
   
    Pharmacie.findByIdAndDelete(req.query.id, (err, doc) =>{

        if(err){

            res.status(500, {"Content-Type": "application/json"}).send(err);

        }else{

            res.status(200, {"Content-Type": "application/json"}).send(doc);

        }
    })

});

module.exports = router;