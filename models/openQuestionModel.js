const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({

    libelle: String,
    answer: String

});

const question = mongoose.model('question', questionSchema);

module.exports = question;