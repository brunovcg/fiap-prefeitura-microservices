const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

mongoose.connect('mongodb://localhost:27017/prefeitura');
mongoose.Promise = global.Promise;

module.exports = mongoose;