const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const PharmacieModel = require('../../models/pharmacieModel');

router.post('/savePharmacie', (req, res) => {

    var pharmacie = new PharmacieModel(res.body);
    pharmacie.save();

});

module.exports = router;