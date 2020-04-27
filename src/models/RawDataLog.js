const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const RawDataLogSchema = new Schema({
    timestamp: String, // Possibly make a unix timestamp
    vocConcentration: Number,
    humidity: Number,
    barometricPressure: Number,
    massConcentration: Number
});

module.exports = mongoose.model('RawDataLog', RawDataLogSchema);