const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    id: Number,
    owners: [{username: String, userID: Number}] // Possibly encrypt this data
});

module.exports = mongoose.model('Device', DeviceSchema);