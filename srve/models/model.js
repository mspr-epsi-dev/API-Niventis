const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacie = new Schema({

    name: String,
    adress: {
        nb:Number,
        rue: String,
        codepostal: Number
    },
    lattitude: String,
    longitude: String,
    turnover: String,
    trainingNeed: String

 });

const pharmacie = mongoose.model('pharmacie', pharmacie);

module.exports = pharmacie;