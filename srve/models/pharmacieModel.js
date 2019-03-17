const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacieSchema = new Schema({

    name: String,
    adress: {
        nbr:Number,
        rue: String,
        codepostal: Number
    },
    lattitude: String,
    longitude: String,
    turnover: String,
    trainingNeed: String

 });

const pharmacie = mongoose.model('pharmacie', pharmacieSchema);

module.exports = pharmacie;