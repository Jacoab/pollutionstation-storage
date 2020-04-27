const mongoose = require('mongoose');

module.exports = function connect() {
    mongoose.connect(process.env.DB_USER, {useNewUrlParser: true});

    mongoose.connection.once('open', function () {
        console.log('User schema has been added to database');
    }).on('error', function (error) {
        console.log('Error is: ', error);
    });

    mongoose.set('useCreateIndex', true);
};