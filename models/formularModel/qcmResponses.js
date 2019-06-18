const mongoose = require('mongoose');
const Schema = mongoose.Schema;

qcmResponseSchema = new Schema({

    choix: String,
    selected: Boolean

});

module.exports = qcmResponseSchema;