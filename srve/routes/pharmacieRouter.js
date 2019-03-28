const express = require('express');
const router = express.Router();
const Pharmacie = require('../models/pharmacieModel');
const route = require('./routeProperties');

var contentTypeJson = contentTypeJson

router.get(route.hello, (req, res) => {
    
    res.send({hello: "hello"});

});

router.post(route.savePharmacie, (req, res) => {

    try {

        var pharmacie = new Pharmacie(req.body);
    
        pharmacie.save((err, doc) => {
    
            if(err){
    
                if(err.name){
                    var msg = "the ressource you sent is incorrectly formed";
                    res.status(400, contentTypeJson).send({message :msg});
                    
                }
    
            }else{

                var msg = "Pharmacie successfuly added !";
                res.status(200, contentTypeJson).send({message : msg, doc});
    
            }
    
        });

    } catch (err) {
        
        var msg = "something wen wrong on our side... sorry duuuuude";
        res.status(500, contentTypeJson).send({message : msg, error});

    }

});


router.get(route.getAllPharmacies, (req, res) => {
    
    Pharmacie.find({}, (error, doc) => {
        if(error){

            res.status(500, contentTypeJson).send(err);

        }else{
            
            if(doc){
                
                res.status(200, contentTypeJson).send(doc)
                
            }else{

                var msg = "No pharmacie found";
                res.status(404, contentTypeJson).send(msg);

            }
        }

    })


});

router.get(route.getPharmacieById, (req, res) => {

    Pharmacie.findById(req.query.id, (err,doc) => {

        if(err){

            res.status(500, contentTypeJson).send(err);

        }else{

            if(doc){

                res.status(200, contentTypeJson).send(doc);

            }else{

                var msg = "No pharmacie found";
                res.status(404, contentTypeJson).send(msg);

            }

        }

    });

});

router.put(route.updatePharmacie, (req, res) => {

    Pharmacie.findOneAndUpdate(req.query.id, (err, doc) => {

        if(err){

            res.status(500, contentTypeJson).send(err);

        }else{

            if(doc){

                res.status(200, contentTypeJson).send(doc);

            }else{

                var msg = "No pharmacie found";
                res.status(404, contentTypeJson).send(msg);

            }

        }

    });

})

router.delete(route.deletePharmacie, (req,res) => {
   
    Pharmacie.findByIdAndDelete(req.query.id, (err, doc) =>{

        if(err){

            res.status(500, contentTypeJson).send(err);

        }else{

            res.status(200, contentTypeJson).send(doc);

        }
    })

});

module.exports = router;