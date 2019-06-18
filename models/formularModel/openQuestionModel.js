const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({

    libelle: String,
    answer: String

});

module.exports = questionSchema;