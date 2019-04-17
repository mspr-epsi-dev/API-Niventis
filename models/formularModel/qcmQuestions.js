const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const qcmSchema = new Schema({

    libelle: String,
    answers: [String]

});

module.exports = qcmSchema;