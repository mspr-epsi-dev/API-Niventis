const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const openQuestion = require('./openQuestionModel');
const qcmQuestion = require('./openQuestionModel');

const formularSchema = new Schema({
    
    participantId: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },
    openQuestion: [openQuestion],
    qcmQuestion: [qcmQuestion]
    

});

const formular = mongoose.model('formular', formularSchema);

module.exports = formular;