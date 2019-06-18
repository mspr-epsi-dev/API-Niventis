const mongoose = require('mongoose');
const qcmResponse = require('./qcmResponses');
const Schema = mongoose.Schema;

const qcmQuestionSchema = new Schema({

    libelle: String,
    answers: {
        type: [qcmResponse],
        default: undefined
    }

});

module.exports = qcmQuestionSchema;