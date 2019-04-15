const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const qcmSchema = new Schema({

    libelle: String,
    answer: String

});

const qcm = mongoose.model('qcm', qcmSchema);

module.exports = qcm;