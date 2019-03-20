const express = require('express');
const router = express.Router();
const PharmacieModel = require('../../models/pharmacieModel');

router.post('/savePharmacie', (req, res) => {

    var pharmacie = new PharmacieModel(req.body);
    console.log(req.body);
    
    pharmacie.save((err, doc) => {

        if(err){

            res.status(500, {"Content-Type": "application/json"}).send(err);

        }else{

            res.status(200, {"Content-Type": "application/json"}).send(doc);

        }

    });

});

module.exports = router;