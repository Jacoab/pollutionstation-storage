var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.USER_KEY, { useNewUrlParser: true } );
mongoose.connection.once('open', function());

