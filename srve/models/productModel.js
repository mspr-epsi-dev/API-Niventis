const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productBoughtSchema = new Schema({

    productName: String,
    quantityBoughtPerMonth: Number,
    productPrice: Number

 });

module.exports = productBoughtSchema;