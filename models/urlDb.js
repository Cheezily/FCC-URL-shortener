var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlsSchema = new Schema({
  url: {type: String, required: true, unique: true},
  short: {type: Number, requried: true, unique: true}
});

var urlsDB = mongoose.model('urlsDB', urlsSchema);
module.exports = urlsDB;
