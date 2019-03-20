const express = require('express');
const router = express.Router();
const PharmacieModel = require('../../models/pharmacieModel');

router.post('/savePharmacie', (req, res) => {

    var pharmacie = new PharmacieModel(req.body);

    pharmacie.save((err, doc) => {

        if(err){

            res.writeHead(500, {"Content-Type": "application/json"});
            res.json(err);
            res.end();

        }else{

            res.writeHead(200, {"Content-Type": "application/json"});
            res.json(doc);
            res.end();

        }

    });

});

module.exports = router;