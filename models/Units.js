const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Units = mongoose.model('Units', new Schema({
    name: String,
    supplier: String,
}));

module.exports = Units;