const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./productModel');

const pharmacieSchema = new Schema({

    name: {type : String, required: true},
    adress: {
        nbr:Number,
        street: String,
        zipCode: Number,
        city: String
    },
    lattitude: Number,
    longitude: Number,
    turnover: Number,
    trainingNeed: String,
    productBought: [Product]

 });

const Pharmacie = mongoose.model('pharmacie', pharmacieSchema);

module.exports = Pharmacie;