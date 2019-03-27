const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Pharmacie = require('../models/pharmacieModel');
const route = require('./routeProperties');

router.get(route.hello, (req, res) => {
    
    res.send({hello: "hello"});

});

router.post(route.savePharmacie, (req, res) => {

    try {
        
        var pharmacie = new Pharmacie(req.body);
    
        pharmacie.save((err, doc) => {
    
            if(err){
    
                if(err.name){
                    
                    res.status(400, {"Content-Type": "application/json"}).send({message :"the ressource you sent is incorrectly formed"});
                    
                }
                
    
            }else{
    
                res.status(200, {"Content-Type": "application/json"}).send({message : "Pharmacie successfuly added !", doc});
    
            }
    
        });

    } catch (error) {
        
        res.status(500, {"Content-Type": "application/json"}).send({message : "something wen wrong on our side... sorry duuuuude", error});

    }

});

router.get(route.getAllPharmacies, (req, res) => {
    
    Pharmacie.find({}, (error, doc) => {
        if(error){

            res.status(500, {"Content-Type": "application/json"}).send(err);

        }else{
            
            if(doc){
                
                res.status(200, {"Content-Type": "application/json"}).send(doc);
                
            }else{

                var msg = "No pharmacie found";
                res.status(404, {"Content-Type": "application/json"}).send(msg);

            }
        }

    })


});

router.get(route.getPharmacieById, (req, res) => {

    Pharmacie.findById(req.query.id, (err,doc) => {

        if(err){

            res.status(500, {"Content-Type": "application/json"}).send(err);

        }else{

            if(doc){

                res.status(200, {"Content-Type": "application/json"}).send(doc);

            }else{

                var msg = "No pharmacie found";
                res.status(404, {"Content-Type": "application/json"}).send(msg);

            }

        }

    });

});

router.put(route.updatePharmacie, (req, res) => {

    Pharmacie.findOneAndUpdate(req.query.id, (err, doc) => {

        if(err){

            res.status(500, {"Content-Type": "application/json"}).send(err);

        }else{

            if(doc){

                res.status(200, {"Content-Type": "application/json"}).send(doc);

            }else{

                var msg = "No pharmacie found";
                res.status(404, {"Content-Type": "application/json"}).send(msg);

            }

        }

    });

})

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