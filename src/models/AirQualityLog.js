var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LOC stands for Level of Concern
var AirQualityLogSchema = new Schema({
    timeInterval: {start: String, end: String}, // Possibly add a symbol for the interval
    vocLOC: String,
    temperature: Number,
    humidity: Number,
    barometricPressure: Number,
    particulateMatterLOC: String
});

module.exports = mongoose.model('AirQualityLog', AirQualityLogSchema);